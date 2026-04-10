package com.stackit.service;

import com.stackit.model.Goal;
import com.stackit.model.Stack;
import com.stackit.model.Technology;
import com.stackit.repository.GoalRepository;
import com.stackit.repository.StackRepository;
import com.stackit.repository.TechnologyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DataSeeder implements CommandLineRunner {

        @Autowired
        private TechnologyRepository technologyRepository;

        @Autowired
        private StackRepository stackRepository;

        @Autowired
        private GoalRepository goalRepository;

        @Override
        public void run(String... args) throws Exception {
                if (technologyRepository.count() == 0) {
                        List<Technology> initialTechs = Arrays.asList(
                                        new Technology(null, "React", "Frontend", "react", "Frontend Framework", 92,
                                                        "18.2.0", 14),
                                        new Technology(null, "Node.js", "Backend", "nodejs", "Backend Runtime", 85,
                                                        "20.9.0 LTS", 8),
                                        new Technology(null, "PostgreSQL", "Database", "postgres",
                                                        "Relational Database", 78, "15.4", 4),
                                        new Technology(null, "Docker", "DevOps", "docker", "Containerization", 88,
                                                        "24.0", 22),
                                        new Technology(null, "Tailwind CSS", "Frontend", "tailwindcss",
                                                        "Utility-First CSS", 95, "3.3", 31),
                                        new Technology(null, "AWS", "DevOps", "amazonwebservices",
                                                        "Cloud Infrastructure", 64, "us-east-1", 45),
                                        new Technology(null, "Java", "Backend", "java", "High-level programming language", 85, "21", 4),
                                        new Technology(null, "Spring Boot", "Backend", "spring", "Production-ready Spring framework", 75, "3.2.0", 3),
                                        new Technology(null, "TypeScript", "Frontend", "typescript", "Strongly typed JavaScript", 92, "5.3", 10));
                        technologyRepository.saveAll(initialTechs);
                        System.out.println("Initial technology data seeded!");

                        if (stackRepository.count() == 0) {
                                List<Stack> initialStacks = Arrays.asList(
                                                new Stack(null, "Main-API-Service", "Core backend services and logic",
                                                                new ArrayList<>(
                                                                                Arrays.asList(initialTechs.get(1),
                                                                                                initialTechs.get(2),
                                                                                                initialTechs.get(3))),
                                                                null, "api.acmecorp.com", "HEALTHY", "Production",
                                                                99.98, 42, 92, "12.4k/hr", 45,
                                                                "1.2k/s"),
                                                new Stack(null, "Customer-Portal-UI",
                                                                "Public-facing dashboard for portal",
                                                                new ArrayList<>(Arrays.asList(initialTechs.get(0),
                                                                                initialTechs.get(4))),
                                                                null,
                                                                "portal.acmecorp.com", "SYNCING", "Staging", 99.5, 120,
                                                                84, "8.2k/hr", 62, "800/s"),
                                                new Stack(null, "Legacy-Data-Cluster",
                                                                "Historical data storage cluster",
                                                                new ArrayList<>(Arrays.asList(initialTechs.get(2))),
                                                                null, "db-p-01.internal",
                                                                "DEGRADED", "Legacy", 94.2, 550, 48, "2.1k/hr", 94,
                                                                "2.1k/s"));
                                stackRepository.saveAll(initialStacks);
                                System.out.println("Initial stack data seeded!");
                        }

                        if (goalRepository.count() == 0) {
                                List<Goal> initialGoals = Arrays.asList(
                                                new Goal(null, "Rust Core Concepts", "Rust",
                                                                "Mastering ownership and borrowing", "IN_PROGRESS",
                                                                85, "High", "Skill", "+5%"),
                                                new Goal(null, "System Architecture", "General",
                                                                "Designing scalable distributed systems",
                                                                "IN_PROGRESS", 42, "Medium", "Skill", "+2%"),
                                                new Goal(null, "GraphQL Optimization", "GraphQL",
                                                                "Performance tuning for complex queries",
                                                                "IN_PROGRESS", 60, "High", "Skill", "+8%"),
                                                new Goal(null, "Uptime Target", "Infrastructure",
                                                                "Maintaining 99.9% uptime", "MASTERED", 99,
                                                                "High", "KPI", "+1%"),
                                                new Goal(null, "Error Resolution", "Support",
                                                                "Reducing mean time to resolution", "IN_PROGRESS",
                                                                84, "Medium", "KPI", "-3%"),
                                                new Goal(null, "Active Goals", "General", "Currently active targets",
                                                                "IN_PROGRESS", 68, "Low",
                                                                "Stat", "+2% vs last month"),
                                                new Goal(null, "Completed", "General", "Year-to-date milestones",
                                                                "MASTERED", 100, "Low",
                                                                "Stat", "+5% vs last month"),
                                                new Goal(null, "Avg. Progress", "General",
                                                                "Overall workspace readiness", "IN_PROGRESS", 68,
                                                                "Low", "Stat", "+3% vs last month"));
                                goalRepository.saveAll(initialGoals);
                                System.out.println("Initial goal data seeded!");
                        }
                }
        }
}
