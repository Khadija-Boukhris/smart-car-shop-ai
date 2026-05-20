package org.cours.web;

import org.cours.modele.Proprietaire;
import org.cours.modele.ProprietaireRepo;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @Autowired
    private ProprietaireRepo proprietaireRepo;

    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    @GetMapping("/voitures/{id}")
    public Optional<Voiture> getVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id);
    }

    @PostMapping("/voitures")
    public Voiture ajouterVoiture(@RequestBody Voiture voiture) {
        if (voiture.getProprietaire() == null) {
            voiture.setProprietaire(getDefaultProprietaire());
        }
        return voitureRepo.save(voiture);
    }

    @PutMapping("/voitures/{id}")
    public Voiture modifierVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        voiture.setId(id);
        if (voiture.getProprietaire() == null) {
            voiture.setProprietaire(getDefaultProprietaire());
        }
        return voitureRepo.save(voiture);
    }

    @DeleteMapping("/voitures/{id}")
    public void supprimerVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
    }

    private Proprietaire getDefaultProprietaire() {
        return proprietaireRepo.findById(1L)
                .orElseGet(() -> proprietaireRepo.save(new Proprietaire("Ali", "Hassan")));
    }
}
