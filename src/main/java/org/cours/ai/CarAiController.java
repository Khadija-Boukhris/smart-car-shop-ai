package org.cours.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class CarAiController {

    @Autowired
    private CarAiService carAiService;

    @PostMapping("/recommendations")
    public AiResponse recommendCars(@RequestBody AiRecommendationRequest request) {
        return new AiResponse(carAiService.recommendCars(request));
    }

    @PostMapping("/assistant")
    public AiResponse askAssistant(@RequestBody AiQuestionRequest request) {
        return new AiResponse(carAiService.askBusinessQuestion(request));
    }
}