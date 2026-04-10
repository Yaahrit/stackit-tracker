package com.stackit.controller;

import com.stackit.model.Technology;
import com.stackit.repository.TechnologyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technologies")
@CrossOrigin(origins = "*") // Allow access from any origin (e.g., both Dev and Prod)
public class TechnologyController {

    @Autowired
    private TechnologyRepository technologyRepository;

    @GetMapping
    public List<Technology> getAllTechnologies() {
        return technologyRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Technology> getTechnologiesByCategory(@PathVariable String category) {
        return technologyRepository.findByCategory(category);
    }

    @PostMapping
    public Technology createTechnology(@RequestBody Technology technology) {
        return technologyRepository.save(technology);
    }
}
