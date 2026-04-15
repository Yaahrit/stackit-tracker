<div align="center">

<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B00,FF8C00&height=200&section=header&text=StackIt%20Tracker&fontSize=60&fontColor=FFFFFF&fontAlignY=38&desc=AI-Powered%20Developer%20Ecosystem%20Platform&descAlignY=58&descSize=20" width="100%"/>

<br/>

![Java](https://img.shields.io/badge/Java-Spring%20Boot-ED8B00?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-4285F4?style=for-the-badge&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br/>

> **MCA Major Project** — A full-stack intelligent platform that unifies project health, skill mastery, and AI-driven developer guidance into a single cohesive experience.

<br/>

[🚀 Features](#-features) • [🏗️ Architecture](#️-system-architecture) • [🧠 AI Module](#-the-ai-module) • [📦 Installation](#-installation) • [📸 Screenshots](#-screenshots) • [🗄️ Database Schema](#️-database-schema) • [🔮 Roadmap](#-roadmap)

</div>

---

## 🎯 Overview

**StackIt Tracker** is not just another project tracker — it is an **Intelligent Developer Mentor**. Built for modern developers who face the challenge of keeping up with an ever-expanding tech landscape, StackIt Tracker bridges the gap between skill growth, project delivery, and architectural decisions.

### The Problem It Solves

| Challenge | StackIt's Solution |
|---|---|
| 🌀 Overwhelming tech choices | AI-powered Skill Recommendation Engine |
| 📦 Fragmented project management | Unified Dashboard with health scoring |
| 🔩 Architectural misalignment | Automated Compatibility Audit Engine |
| 🗺️ No structured learning path | Milestone-based Roadmap Generator |

---

## ✨ Features

### 🧠 AI-Driven Intelligence
- **Skill Recommendation Engine** — Analyzes mastery levels and suggests niche, high-value technologies (GraphQL, Redis, Kafka, etc.)
- **Productivity Score Calculator** — Real-time scoring based on stack delivery velocity and goal completion rate
- **Architectural Compatibility Audit** — Validates Frontend ↔ Backend ↔ Database synergy to flag mismatches before they become technical debt
- **6-Stage Learning Roadmap** — Converts ambitious goals into structured, milestone-driven learning plans
- **AI Desc-Infuse** — Auto-generates professional mission objectives for new projects using NLP-style logic

### 💻 Developer Dashboard
- Real-time stack health monitoring
- Technology versioning with percentage-based mastery tracking
- Project lifecycle management from ideation to delivery
- Global user profile state with Base64 avatar persistence

### 🎨 Premium UI/UX
- Dark-themed glassmorphism design with **Orange & Black** signature palette
- Framer Motion-powered transitions and micro-interactions
- Fully responsive with `Outfit` + `Inter` typography pairing
- Accessible component library built with Tailwind CSS

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│   React 18 (TypeScript) + Vite + Framer Motion + Tailwind CSS  │
│   ┌────────────┐  ┌────────────┐  ┌──────────────────────────┐ │
│   │  Dashboard │  │ AI Advisor │  │   Profile & Settings     │ │
│   └────────────┘  └────────────┘  └──────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API (JSON)
┌────────────────────────────▼────────────────────────────────────┐
│                       SERVER LAYER                              │
│            Spring Boot 3 (Java 17) — REST API                  │
│   ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│   │  Auth Service│  │  Stack Service│  │   AI Service      │   │
│   │  (JWT/OAuth) │  │  (CRUD + Health)│ │  (AiService.java) │   │
│   └──────────────┘  └──────────────┘  └───────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ JDBC / JPA
┌────────────────────────────▼────────────────────────────────────┐
│                      DATA LAYER                                 │
│                    PostgreSQL 15                                │
│   ┌────────────┐  ┌────────────────┐  ┌─────────────────────┐ │
│   │   Stacks   │  │  Technologies  │  │    User Profiles    │ │
│   └────────────┘  └────────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

> The architecture follows a **decoupled Client-Server** pattern with a **Service-Oriented AI Layer**, making AI logic swappable — currently mock, Gemini-ready.

---

## 🧠 The AI Module

The core innovation of StackIt Tracker is its **5-prompt AI engine**, each designed to address a specific developer pain point:

```
AiService.java
├── 1. SkillRecommendationEngine     ──► Analyzes mastery → suggests niche techs
├── 2. ProductivityInsightsEngine    ──► Scores delivery velocity & goal completion
├── 3. ArchitecturalAuditEngine      ──► Validates stack compatibility
├── 4. LearningRoadmapGenerator      ──► 6-stage milestone roadmaps
└── 5. AiDescInfuse                  ──► NLP-powered project objective generator
```

**Design Philosophy:** The AI layer is built with a **Façade Pattern** — all five modules are orchestrated through a single `AiService.java` interface. Swapping from mock data to a live Gemini API requires changing only the HTTP client implementation, with zero changes to the calling code.

---

## 📦 Installation

### Prerequisites

```bash
# Java 17+
java -version

# Node.js 18+
node -version

# PostgreSQL 15+
psql --version
```

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/stackit-tracker.git
cd stackit-tracker/backend

# 2. Configure your database in application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/stackit_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# 3. Build and run
./mvnw spring-boot:run
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

> The app will be available at `http://localhost:5173`

---

## 🗄️ Database Schema

```sql
-- Core Tables

CREATE TABLE user_profiles (
    id          BIGSERIAL PRIMARY KEY,
    username    VARCHAR(50) UNIQUE NOT NULL,
    avatar_data TEXT,                        -- Base64 encoded; TEXT used over VARCHAR
    created_at  TIMESTAMP DEFAULT NOW()      -- to avoid 255-char truncation on image data
);

CREATE TABLE stacks (
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT REFERENCES user_profiles(id),
    name         VARCHAR(100) NOT NULL,
    health_score INT CHECK (health_score BETWEEN 0 AND 100),
    uptime       DECIMAL(5,2),
    created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE technologies (
    id         BIGSERIAL PRIMARY KEY,
    stack_id   BIGINT REFERENCES stacks(id),
    name       VARCHAR(100) NOT NULL,
    version    VARCHAR(20),
    mastery    INT CHECK (mastery BETWEEN 0 AND 100)   -- Percentage-based proficiency
);
```

> **Design Decision**: `TEXT` is used for avatar storage instead of `VARCHAR` because Base64-encoded image strings routinely exceed the 255-character limit. `TEXT` in PostgreSQL stores up to 1 GB with no performance penalty over `VARCHAR` for large content.

---

## 📸 Screenshots

| Dashboard | AI Advisor | Roadmap View |
|---|---|---|
| *(Coming Soon)* | *(Coming Soon)* | *(Coming Soon)* |

---

## 🔧 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + TypeScript | Component-based UI |
| **Build Tool** | Vite | Fast HMR & bundling |
| **Styling** | Tailwind CSS | Utility-first styling |
| **Animations** | Framer Motion | Declarative transitions |
| **Backend** | Spring Boot 3 (Java 17) | REST API + Business Logic |
| **ORM** | Spring Data JPA / Hibernate | Database abstraction |
| **Auth** | Spring Security + JWT | Stateless authentication |
| **Database** | PostgreSQL 15 | Relational persistence |
| **AI Layer** | Gemini AI (Mock-ready) | Intelligent recommendations |

---

## 🔮 Roadmap

- [x] Core dashboard with stack & technology management
- [x] AI module with 5 intelligent prompt engines
- [x] JWT-based authentication
- [x] Base64 avatar global state management
- [ ] **Live Gemini API Integration** — Replace mock layer with real API calls
- [ ] **GitHub/GitLab Sync** — Automated commit tracking & contribution analysis
- [ ] **Team Collaboration** — Shared tech ecosystems & peer reviews
- [ ] **Mobile App** — React Native companion app

---

## 🎓 Academic Context

> This project was developed as a **MCA Major Project** demonstrating proficiency in:
> - Full-stack development with modern Java and TypeScript ecosystems
> - Service-Oriented Architecture (SOA) design patterns
> - AI/ML integration in production-grade applications
> - Database design and optimization for scalable systems
> - Modern UI/UX engineering with glassmorphism and motion design

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with 🔥 by Yash Raj**

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF6B00,FF8C00&height=100&section=footer" width="100%"/>

</div>
