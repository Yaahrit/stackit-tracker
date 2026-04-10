export interface Technology {
    id: number;
    name: string;
    category: string;
    icon: string;
    description?: string;
    mastery: number;
    version: string;
    activeAssets: number;
}

export interface Stack {
    id: number;
    name: string;
    description: string;
    technologies: Technology[];
    createdAt: string;
    url?: string;
    status?: string;
    category?: string;
    uptime?: number;
    latency?: number;
    healthScore?: number;
    requests?: string;
    memoryUsage?: number;
    iops?: string;
}

export type ViewType = 'Dashboard' | 'Tech Stack' | 'Projects' | 'Goals' | 'Settings' | 'Profile' | 'Stats' | 'Viva Prep';

export interface UserProfile {
    id?: number;
    name: string;
    email?: string;
    role: string;
    bio: string;
    location?: string;
    avatar?: string;
}

export type GoalStatus = 'IN_PROGRESS' | 'MASTERED' | 'PLANNED';

export interface Goal {
    id: number;
    title: string;
    tech: string;
    description: string;
    status: GoalStatus;
    progress: number;
    difficulty: 'Low' | 'Medium' | 'High';
    category?: 'Skill' | 'Ecosystem' | 'KPI' | 'Stat';
    delta?: string;
}
