package com.stackit.service;

import org.springframework.stereotype.Service;

@Service
public class AiService {

    public String generateProjectDescription(String name) {
        if (name == null || name.isEmpty())
            return "Enter a project name to generate a description.";
        return "This " + name
                + " project is designed as a high-performance system leveraging modern architectural patterns. " +
                "It focuses on scalability, real-time monitoring, and seamless user experience using a cutting-edge tech stack.";
    }

    public String generateRoadmap(String goal, String currentTech) {
        return "### AI Learning Roadmap: " + goal + "\n" +
                "**Current Skills:** " + (currentTech != null ? currentTech : "Foundational") + "\n\n" +
                "1. **Stage 1: Core Fundamentals** - Focus on syntax and basic architecture unique to " + goal
                + ". (Difficulty: Beginner)\n" +
                "2. **Stage 2: Environment Setup** - Configuring local dev tools and first integrated modules. (Difficulty: Beginner)\n"
                +
                "3. **Stage 3: Data Management** - Understanding state, props, and persistent storage patterns. (Difficulty: Intermediate)\n"
                +
                "4. **Stage 4: API Integration** - Connecting backend services and handling async operations. (Difficulty: Intermediate)\n"
                +
                "5. **Stage 5: Security & Testing** - Implementing JWT auth and unit testing critical paths. (Difficulty: Advanced)\n"
                +
                "6. **Stage 6: Deployment & Scaling** - CI/CD pipelines, containerization (Docker), and cloud hosting.";
    }

    public String getSkillRecommendations(String techs, String projects) {
        return "[\n" +
                "  {\"name\": \"GraphQL\", \"why\": \"To optimize API data fetching and reduce over-fetching in your projects.\", \"difficulty\": \"Intermediate\"},\n"
                +
                "  {\"name\": \"Next.js\", \"why\": \"For SEO optimization and Server-Side Rendering (SSR) capabilities.\", \"difficulty\": \"Intermediate\"},\n"
                +
                "  {\"name\": \"Redis\", \"why\": \"To improve performance with high-speed caching for your API services.\", \"difficulty\": \"Advanced\"},\n"
                +
                "  {\"name\": \"Kubernetes\", \"why\": \"For advanced orchestration and scaling of your Dockerized microservices.\", \"difficulty\": \"Advanced\"},\n"
                +
                "  {\"name\": \"TypeScript\", \"why\": \"To add type safety and improve maintainability of your frontend codebase.\", \"difficulty\": \"Beginner\"}\n"
                +
                "]";
    }

    public String analyzeProjectStack(String name, String frontend, String backend, String db) {
        return "### AI Stack Analysis for " + name + "\n" +
                "1. **Strengths:** Excellent separation of concerns and modern standard choices.\n" +
                "2. **Possible Improvements:** Consider adding a message broker like RabbitMQ for async processing if load increases.\n"
                +
                "3. **Recommended Tools:** Use Prometheus and Grafana for deep infrastructure monitoring.\n" +
                "4. **Scalability:** The " + backend + " + " + db
                + " combination scales horizontally with proper load balancing.";
    }

    public String getProductivityInsights(int projects, String techs, int goals) {
        int score = (projects * 10 + goals * 5);
        if (score > 100)
            score = 98;
        return "{\n" +
                "  \"score\": " + score + ",\n" +
                "  \"strengths\": [\"Consistent project delivery\", \"Diverse tech stack exploration\"],\n" +
                "  \"improvements\": [\"Deeper mastery in " + (techs.contains(",") ? techs.split(",")[0] : "Core Tech")
                + "\"],\n" +
                "  \"suggestions\": \"Try setting more complex technical goals to reach the next productivity tier.\"\n"
                +
                "}";
    }

    public String evaluateCompatibility(String frontend, String backend, String db) {
        return "### Architecture Compatibility Feedback\n" +
                "- **Frontend (" + frontend + ") & Backend (" + backend
                + "):** Highly compatible. Standard industry pairing for decoupled SPAs.\n" +
                "- **Performance:** Expect sub-100ms response times for optimized " + db + " queries.\n" +
                "- **Deployment:** Best suited for Azure/AWS using Vercel for frontend and Docker for " + backend + ".";
    }

    public String getVivaQuestions(String techs) {
        return "[\n" +
                "  {\"question\": \"What are the advantages of using Spring Boot over traditional Spring for this project?\", \"answer\": \"Auto-configuration, standalone executable JARs, and embedded servers simplify deployment and reduce boilerplate code.\", \"difficulty\": \"Beginner\"},\n"
                +
                "  {\"question\": \"How do you handle cross-origin resource sharing (CORS) in your React-Spring integration?\", \"answer\": \"Applied @CrossOrigin on controllers or configured a WebMvcConfigurer bean to allow frontend requests from specific origins.\", \"difficulty\": \"Intermediate\"},\n"
                +
                "  {\"question\": \"Why did you choose a NoSQL vs SQL database for this specific architecture?\", \"answer\": \"PostgreSQL was chosen for its ACID compliance and strong relational integrity, which is critical for tracking interconnected tech stacks.\", \"difficulty\": \"Advanced\"},\n"
                +
                "  {\"question\": \"Explain the role of 'TEXT' data type in your avatar storage.\", \"answer\": \"Used to store large Base64 strings without the 255-character limit of VARCHAR, ensuring high-res profile photo support.\", \"difficulty\": \"Intermediate\"},\n"
                +
                "  {\"question\": \"What architectural pattern does your frontend follow?\", \"answer\": \"Component-based architecture using React, focusing on reusability, modularity, and one-way data flow.\", \"difficulty\": \"Beginner\"}\n"
                +
                "]";
    }
}
