import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Cpu, Lightbulb, CheckCircle2 } from 'lucide-react';

interface SkillRecommendation {
    name: string;
    why: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface AiInsightsProps {
    type: 'skills' | 'productivity' | 'compatibility' | 'analysis';
    data: any;
    title?: string;
}

export const AiInsights: React.FC<AiInsightsProps> = ({ type, data, title }) => {
    if (!data) return null;

    const renderSkills = () => {
        const skills: SkillRecommendation[] = typeof data === 'string' ? JSON.parse(data) : data;
        return (
            <div className="ai-skills-grid" style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                {skills.map((skill, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h4 style={{ color: '#f97316', fontWeight: 700 }}>{skill.name}</h4>
                            <span style={{ fontSize: '0.65rem', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', padding: '2px 8px', borderRadius: '10px', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
                                {skill.difficulty}
                            </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: '1.4' }}>{skill.why}</p>
                    </motion.div>
                ))}
            </div>
        );
    };

    const renderProductivity = () => {
        const stats = typeof data === 'string' ? JSON.parse(data) : data;
        return (
            <div style={{ padding: '1.5rem', background: 'rgba(249, 115, 22, 0.03)', borderRadius: '24px', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray={`${stats.score}, 100`} />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
                            {stats.score}
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Productivity Score</h4>
                        <p style={{ fontSize: '0.85rem', color: '#888' }}>Based on your recent architectural activity</p>
                    </div>
                </div>
                <div style={{ display: 'grid', gap: '0.8rem' }}>
                    {stats.strengths.map((s: string, i: number) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#bbb' }}>
                            <CheckCircle2 size={14} color="#22c55e" /> {s}
                        </div>
                    ))}
                    <div style={{ marginTop: '0.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', fontSize: '0.85rem', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
                        <Lightbulb size={14} style={{ marginRight: '6px' }} /> {stats.suggestions}
                    </div>
                </div>
            </div>
        );
    };

    const renderMarkdown = () => (
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', whiteSpace: 'pre-wrap', color: '#aaa', lineHeight: '1.6', fontSize: '0.9rem' }}>
            {data}
        </div>
    );

    return (
        <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <Zap size={20} color="#f97316" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title || 'AI Insights'}</h2>
            </div>
            {type === 'skills' && renderSkills()}
            {type === 'productivity' && renderProductivity()}
            {(type === 'compatibility' || type === 'analysis') && renderMarkdown()}
        </section>
    );
};
