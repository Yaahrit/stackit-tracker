package com.stackit.controller;

import com.stackit.model.UserProfile;
import com.stackit.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @GetMapping("/email/{email}")
    public ResponseEntity<UserProfile> getProfileByEmail(@PathVariable String email) {
        return userProfileRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public UserProfile updateProfile(@RequestBody UserProfile profile) {
        // Simple logic for single user profile management
        if (profile.getId() != null) {
            return userProfileRepository.save(profile);
        }
        return userProfileRepository.save(profile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateProfile(@PathVariable Long id, @RequestBody UserProfile profileDetails) {
        return userProfileRepository.findById(id).map(profile -> {
            profile.setName(profileDetails.getName());
            profile.setEmail(profileDetails.getEmail());
            profile.setRole(profileDetails.getRole());
            profile.setBio(profileDetails.getBio());
            profile.setLocation(profileDetails.getLocation());
            profile.setAvatar(profileDetails.getAvatar());
            return ResponseEntity.ok(userProfileRepository.save(profile));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
