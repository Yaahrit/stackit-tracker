package com.stackit.controller;

import com.stackit.model.User;
import com.stackit.repository.UserRepository;
import com.stackit.security.JwtUtils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isPresent()
                && passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword())) {
            String token = jwtUtils.generateToken(request.getEmail());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", request.getEmail());
            response.put("fullName", userOptional.get().getFullName());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid email or password.");
    }

    @Data
    static class SignupRequest {
        private String email;
        private String password;
        private String fullName;
    }

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }
}
