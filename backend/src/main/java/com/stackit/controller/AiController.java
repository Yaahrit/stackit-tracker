package com.stackit.controller;

import com.stackit.service.AiService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/suggest-description")
    public String suggestDescription(@RequestBody AiRequest request) {
        return aiService.generateProjectDescription(request.getInput());
    }

    @PostMapping("/generate-roadmap")
    public String generateRoadmap(@RequestBody AiRequest request) {
        return aiService.generateRoadmap(request.getInput(), request.getSecondaryInput());
    }

    @PostMapping("/recommend-skills")
    public String recommendSkills(@RequestBody AiRequest request) {
        return aiService.getSkillRecommendations(request.getInput(), request.getSecondaryInput());
    }

    @PostMapping("/analyze-stack")
    public String analyzeStack(@RequestBody AiRequest request) {
        return aiService.analyzeProjectStack(request.getInput(), request.getFrontend(), request.getBackend(),
                request.getDb());
    }

    @PostMapping("/productivity-insight")
    public String getProductivityInsight(@RequestBody AiRequest request) {
        return aiService.getProductivityInsights(request.getCount(), request.getInput(), request.getGoalCount());
    }

    @PostMapping("/check-compatibility")
    public String checkCompatibility(@RequestBody AiRequest request) {
        return aiService.evaluateCompatibility(request.getFrontend(), request.getBackend(), request.getDb());
    }

    @PostMapping("/viva-prep")
    public String getVivaPrep(@RequestBody AiRequest request) {
        return aiService.getVivaQuestions(request.getInput());
    }

    @Data
    static class AiRequest {
        private String input;
        private String secondaryInput;
        private String frontend;
        private String backend;
        private String db;
        private int count;
        private int goalCount;
    }
}
