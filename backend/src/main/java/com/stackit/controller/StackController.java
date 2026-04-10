package com.stackit.controller;

import com.stackit.model.Stack;
import com.stackit.repository.StackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stacks")
@CrossOrigin(origins = "http://localhost:5173")
public class StackController {

    @Autowired
    private StackRepository stackRepository;

    @GetMapping
    public List<Stack> getAllStacks() {
        return stackRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stack> getStackById(@PathVariable Long id) {
        Optional<Stack> stack = stackRepository.findById(id);
        return stack.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Stack createStack(@RequestBody Stack stack) {
        return stackRepository.save(stack);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stack> updateStack(@PathVariable Long id, @RequestBody Stack stackDetails) {
        return stackRepository.findById(id).map(stack -> {
            stack.setName(stackDetails.getName());
            stack.setDescription(stackDetails.getDescription());
            stack.setTechnologies(stackDetails.getTechnologies());
            stack.setUrl(stackDetails.getUrl());
            stack.setStatus(stackDetails.getStatus());
            stack.setCategory(stackDetails.getCategory());
            stack.setUptime(stackDetails.getUptime());
            stack.setLatency(stackDetails.getLatency());
            stack.setHealthScore(stackDetails.getHealthScore());
            stack.setRequests(stackDetails.getRequests());
            stack.setMemoryUsage(stackDetails.getMemoryUsage());
            stack.setIops(stackDetails.getIops());
            return ResponseEntity.ok(stackRepository.save(stack));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStack(@PathVariable Long id) {
        if (stackRepository.existsById(id)) {
            stackRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
