package com.stackit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "stacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToMany
    @JoinTable(name = "stack_technologies", joinColumns = @JoinColumn(name = "stack_id"), inverseJoinColumns = @JoinColumn(name = "technology_id"))
    private List<Technology> technologies = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    private String url;

    private String status; // HEALTHY, SYNCING, DEGRADED

    private String category; // Production, Staging, Legacy

    private double uptime;

    private int latency;

    private int healthScore;

    private String requests;

    private int memoryUsage;

    private String iops;
}
