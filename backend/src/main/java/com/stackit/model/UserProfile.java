package com.stackit.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_profiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String name;
    private String role;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String avatar;
}
