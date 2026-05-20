package org.cours.ai;

import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CarAiService {

    @Autowired
    private OllamaChatModel chatModel;

    @Autowired
    private VoitureRepo voitureRepo;

    public String recommendCars(AiRecommendationRequest request) {
        String stock = getStockAsText();

        String prompt = """
                Tu es un assistant IA métier pour un magasin de voitures au Maroc.

                Ton rôle est d'aider un vendeur à recommander les voitures les plus adaptées à un client.
                Tu dois recommander uniquement des voitures présentes dans le stock fourni.

                Stock disponible :
                %s

                Critères du client :
                - Budget maximum : %s MAD
                - Année minimale : %s
                - Marque préférée : %s
                - Couleur préférée : %s
                - Usage prévu : %s

                Réponds en français avec cette structure :
                1. Meilleure recommandation
                2. Alternatives possibles
                3. Justification métier
                4. Question complémentaire à poser au client

                Ne propose jamais une voiture qui n'existe pas dans le stock.
                """.formatted(
                stock,
                valueOrUnknown(request.getBudget()),
                valueOrUnknown(request.getAnneeMin()),
                valueOrUnknown(request.getMarquePreferee()),
                valueOrUnknown(request.getCouleurPreferee()),
                valueOrUnknown(request.getUsage())
        );

        return chatModel.call(prompt);
    }

    public String askBusinessQuestion(AiQuestionRequest request) {
        String stock = getStockAsText();

        String prompt = """
                Tu es un assistant métier spécialisé dans la gestion d'un magasin de voitures.

                Tu dois répondre uniquement à partir du stock suivant :
                %s

                Question du vendeur ou du client :
                %s

                Réponds en français, de façon claire, concise et utile pour la décision commerciale.
                Si l'information n'existe pas dans le stock, dis-le clairement.
                """.formatted(stock, request.getQuestion());

        return chatModel.call(prompt);
    }

    private String getStockAsText() {
        return StreamSupport.stream(voitureRepo.findAll().spliterator(), false)
                .map(v -> "- ID " + v.getId()
                        + " | " + v.getMarque()
                        + " " + v.getModele()
                        + " | couleur: " + v.getCouleur()
                        + " | immatricule: " + v.getImmatricule()
                        + " | année: " + v.getAnnee()
                        + " | prix: " + v.getPrix() + " MAD")
                .collect(Collectors.joining("\n"));
    }

    private String valueOrUnknown(Object value) {
        return value == null || value.toString().isBlank() ? "non précisé" : value.toString();
    }
}