package com.stackit;

import com.stackit.model.Goal;
import com.stackit.model.UserProfile;
import com.stackit.repository.GoalRepository;
import com.stackit.repository.UserProfileRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final GoalRepository goalRepository;
    private final UserProfileRepository userProfileRepository;

    public DataInitializer(GoalRepository goalRepository, UserProfileRepository userProfileRepository) {
        this.goalRepository = goalRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Override
    public void run(String... args) {
        if (userProfileRepository.count() == 0) {
            UserProfile profile = new UserProfile();
            profile.setName("Alex Rivera");
            profile.setRole("Principal Systems Architect");
            profile.setBio(
                    "Specializing in high-performance distributed systems and modern cloud Native architectures. Dedicated to building scalable, resilient ecosystems.");
            profile.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Alex");
            profile.setEmail("alex@stackit.dev");
            userProfileRepository.save(profile);
        }

        if (goalRepository.count() == 0) {
            Goal g1 = new Goal();
            g1.setTitle("Docker Pro");
            g1.setTech("DevOps");
            g1.setDescription("Master container orchestration and multi-stage builds.");
            g1.setStatus("IN_PROGRESS");
            g1.setProgress(70);
            g1.setDifficulty("High");

            Goal g2 = new Goal();
            g2.setTitle("Typescript Expert");
            g2.setTech("Frontend");
            g2.setDescription("Advanced generic patterns and utility types.");
            g2.setStatus("MASTERED");
            g2.setProgress(100);
            g2.setDifficulty("Medium");

            Goal g3 = new Goal();
            g3.setTitle("PostgreSQL Advanced");
            g3.setTech("Database");
            g3.setDescription("Query optimization and indexing strategies.");
            g3.setStatus("PLANNED");
            g3.setProgress(0);
            g3.setDifficulty("High");

            goalRepository.saveAll(Arrays.asList(g1, g2, g3));
        }
    }
}
