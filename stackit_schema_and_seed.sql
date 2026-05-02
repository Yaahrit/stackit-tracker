-- Updated PostgreSQL Schema and Seed Script for StackIt Tracker
-- This script will DROP existing tables to ensure a fresh state matching your Java entities.

-- 1. Drop existing tables to resolve schema mismatches
DROP TABLE IF EXISTS stack_technologies CASCADE;
DROP TABLE IF EXISTS technologies CASCADE;
DROP TABLE IF EXISTS stacks CASCADE;
DROP TABLE IF EXISTS goals CASCADE;

-- 2. Create Tables (Matching JPA Entities exactly)

CREATE TABLE technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    icon VARCHAR(255),
    description TEXT,
    mastery INTEGER,  -- This column was missing in your current DB
    version VARCHAR(255),
    active_assets INTEGER
);

CREATE TABLE stacks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    status VARCHAR(50),
    category VARCHAR(50),
    uptime DOUBLE PRECISION,
    latency INTEGER,
    health_score INTEGER,
    requests VARCHAR(255),
    memory_usage INTEGER,
    iops VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stack_technologies (
    stack_id BIGINT REFERENCES stacks(id) ON DELETE CASCADE,
    technology_id BIGINT REFERENCES technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (stack_id, technology_id)
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    tech VARCHAR(255),
    description TEXT,
    status VARCHAR(50),
    progress INTEGER,
    difficulty VARCHAR(50),
    category VARCHAR(50),
    delta VARCHAR(255)
);

-- 2. Insert Technologies
INSERT INTO technologies (id, name, category, icon, description, mastery, version, active_assets) VALUES
(1, 'React', 'Frontend', 'react', 'Frontend Framework', 92, '18.2.0', 14),
(2, 'Node.js', 'Backend', 'nodejs', 'Backend Runtime', 85, '20.9.0 LTS', 8),
(3, 'PostgreSQL', 'Database', 'postgresql', 'Relational Database', 78, '15.4', 4),
(4, 'Docker', 'DevOps', 'docker', 'Containerization', 88, '24.0', 22),
(5, 'Tailwind CSS', 'Frontend', 'tailwindcss', 'Utility-First CSS', 95, '3.3', 31),
(6, 'AWS', 'DevOps', 'amazonwebservices', 'Cloud Infrastructure', 64, 'us-east-1', 45);

-- 3. Insert Stacks (Projects)
INSERT INTO stacks (id, name, description, url, status, category, uptime, latency, health_score, requests, memory_usage, iops, created_at) VALUES
(1, 'Main-API-Service', 'Core backend services and logic', 'api.acmecorp.com', 'HEALTHY', 'Production', 99.98, 42, 92, '12.4k/hr', 45, '1.2k/s', NOW()),
(2, 'Customer-Portal-UI', 'Public-facing dashboard for portal', 'portal.acmecorp.com', 'SYNCING', 'Staging', 99.5, 120, 84, '8.2k/hr', 62, '800/s', NOW()),
(3, 'Legacy-Data-Cluster', 'Historical data storage cluster', 'db-p-01.internal', 'DEGRADED', 'Legacy', 94.2, 550, 48, '2.1k/hr', 94, '2.1k/s', NOW());

-- 4. Associate Stacks with Technologies
INSERT INTO stack_technologies (stack_id, technology_id) VALUES
(1, 2), (1, 3), (1, 4), -- Main-API: Node, Postgres, Docker
(2, 1), (2, 5),          -- Portal-UI: React, Tailwind
(3, 3);                 -- Legacy: Postgres

-- 5. Insert Goals
INSERT INTO goals (id, title, tech, description, status, progress, difficulty, category, delta) VALUES
(1, 'Rust Core Concepts', 'Rust', 'Mastering ownership and borrowing', 'IN_PROGRESS', 85, 'High', 'Skill', '+5%'),
(2, 'System Architecture', 'General', 'Designing scalable distributed systems', 'IN_PROGRESS', 42, 'Medium', 'Skill', '+2%'),
(3, 'GraphQL Optimization', 'GraphQL', 'Performance tuning for complex queries', 'IN_PROGRESS', 60, 'High', 'Skill', '+8%'),
(4, 'Uptime Target', 'Infrastructure', 'Maintaining 99.9% uptime', 'MASTERED', 99, 'High', 'KPI', '+1%'),
(5, 'Error Resolution', 'Support', 'Reducing mean time to resolution', 'IN_PROGRESS', 84, 'Medium', 'KPI', '-3%'),
(6, 'Active Goals', 'General', 'Currently active targets', 'IN_PROGRESS', 68, 'Low', 'Stat', '+2% vs last month'),
(7, 'Completed', 'General', 'Year-to-date milestones', 'MASTERED', 100, 'Low', 'Stat', '+5% vs last month'),
(8, 'Avg. Progress', 'General', 'Overall workspace readiness', 'IN_PROGRESS', 68, 'Low', 'Stat', '+3% vs last month');

-- Reset SERIAL sequences (Important after manual ID insertion)
SELECT setval('technologies_id_seq', (SELECT MAX(id) FROM technologies));
SELECT setval('stacks_id_seq', (SELECT MAX(id) FROM stacks));
SELECT setval('goals_id_seq', (SELECT MAX(id) FROM goals));
