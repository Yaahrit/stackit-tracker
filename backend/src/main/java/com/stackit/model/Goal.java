package com.stackit.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "goals")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String tech;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status; // IN_PROGRESS, MASTERED, PLANNED
    private Integer progress;
    private String difficulty; // Low, Medium, High
    private String category; // Skill, Ecosystem, KPI
    private String delta; // vs last month
}
