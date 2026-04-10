import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    Zap,
    BarChart3,
    GraduationCap,
    Activity,
    TrendingUp,
    TrendingDown,
    Flame
} from 'lucide-react'
import { Goal } from '../types'
import { GoalModal } from '../components/ui/GoalModal'

interface GoalsProps {
    goals: Goal[];
    onRefresh: () => void;
}

const CircularProgress = ({ percent, label }: { percent: number; label: string }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="circular-metric-group">
            <div className="circular-svg-wrap">
                <svg className="circular-progress-svg" viewBox="0 0 140 140">
                    <circle className="circular-progress-bg" cx="70" cy="70" r={radius} />
                    <circle
                        className="circular-progress-fill"
                        cx="70" cy="70" r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="circular-val-overlay">{percent}%</div>
            </div>
            <span className="circular-label">{label}</span>
        </div>
    );
};

export const Goals = ({ goals, onRefresh }: GoalsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    const stats = useMemo(() => {
        const active = goals.filter(g => g.category === 'Stat' && g.title === 'Active Goals')[0];
        const completed = goals.filter(g => g.category === 'Stat' && g.title === 'Completed')[0];
        const avg = goals.filter(g => g.category === 'Stat' && g.title === 'Avg. Progress')[0];
        return { active, completed, avg };
    }, [goals]);

    const kpis = useMemo(() => {
        const uptime = goals.filter(g => g.category === 'KPI' && g.title === 'Uptime Target')[0];
        const resolution = goals.filter(g => g.category === 'KPI' && g.title === 'Error Resolution')[0];
        return { uptime, resolution };
    }, [goals]);

    const skills = useMemo(() => goals.filter(g => g.category === 'Skill'), [goals]);

    const handleAddGoal = async (newGoalData: any) => {
        try {
            const res = await fetch('http://localhost:8080/api/goals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newGoalData, progress: 0, status: 'IN_PROGRESS', category: 'Skill' })
            });
            if (res.ok) onRefresh();
        } catch (error) { console.error('Error adding goal:', error); }
    };

    return (
        <div className="goals-dashboard-premium">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Goals Tracking</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Monitor your development milestones and performance targets.</p>
                </div>
                <button className="btn-sidebar-action" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px' }} onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> New Goal
                </button>
            </header>

            <div className="goals-stats-header">
                {[
                    { label: 'Active Goals', val: stats.active?.progress || 12, delta: stats.active?.delta || '+2% vs last month' },
                    { label: 'Completed', val: stats.completed?.progress || 45, delta: stats.completed?.delta || '+5% vs last month' },
                    { label: 'Avg. Progress', val: (stats.avg?.progress || 68) + '%', delta: stats.avg?.delta || '+3% vs last month' }
                ].map((s, i) => (
                    <div key={i} className="goal-stat-card">
                        <p className="goal-stat-label">{s.label}</p>
                        <div className="goal-stat-value-row">
                            <span className="goal-stat-number">{s.val}</span>
                            <span className="goal-stat-delta positive">{s.delta}</span>
                        </div>
                    </div>
                ))}
            </div>

            <section className="kpi-section">
                <div className="section-header-compact">
                    <BarChart3 size={20} color="#f97316" />
                    <h2>Key Performance Indicators</h2>
                </div>
                <div className="kpi-grid">
                    <div className="kpi-card-premium">
                        <div className="kpi-card-title">
                            <h3>System Reliability</h3>
                            <span className="status-label-pill">Healthy</span>
                        </div>
                        <div className="circular-kpi-container">
                            <CircularProgress percent={kpis.uptime?.progress || 99.9} label="Uptime Target" />
                            <CircularProgress percent={kpis.resolution?.progress || 84} label="Error Resolution" />
                        </div>
                    </div>
                    <div className="kpi-card-premium">
                        <div className="kpi-card-title">
                            <h3>Deployment Frequency</h3>
                        </div>
                        <div className="deployment-metric-row">
                            <div className="deployment-info">
                                <span className="val">24/week</span>
                                <span className="delta">+12% trend</span>
                            </div>
                        </div>
                        <div className="deployment-chart-mock">
                            <div className="chart-mock-row">
                                {[30, 45, 25, 60, 48, 75, 40].map((h, i) => (
                                    <div key={i} className="chart-mock-bar" style={{ height: `${h}%`, background: i === 5 ? '#f97316' : '' }}></div>
                                ))}
                            </div>
                            <div className="chart-labels-row">
                                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                                    <div key={d} className="chart-day-label">{d}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="skill-acquisition-section">
                <div className="section-header-compact">
                    <GraduationCap size={20} color="#f97316" />
                    <h2>Skill Acquisition & Learning</h2>
                </div>
                <div className="skill-acquisition-grid">
                    <div className="skill-list-card">
                        {skills.map(skill => (
                            <div key={skill.id} className="skill-row-premium" onClick={() => setSelectedGoal(skill)} style={{ cursor: 'pointer' }}>
                                <div className="skill-header">
                                    <span className="skill-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {skill.title}
                                        {skill.description?.includes('Phase') && <Zap size={12} color="#f97316" />}
                                    </span>
                                    <span className="skill-val">{skill.progress}%</span>
                                </div>
                                <div className="skill-bar-track">
                                    <div className="skill-bar-fill" style={{ width: `${skill.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="streak-card-premium">
                        <div className="streak-icon-box">
                            <Flame size={48} />
                        </div>
                        <div className="streak-info">
                            <h4>Learning Streak</h4>
                            <p className="streak-days-val">14 Days</p>
                            <p className="streak-context">You're in the top 5% of active learners this week! Keep it up developer.</p>
                        </div>
                    </div>
                </div>
            </section>

            <GoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddGoal}
            />

            {selectedGoal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(8px)' }} onClick={() => setSelectedGoal(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={e => e.stopPropagation()}
                        style={{ background: '#0c0c0c', border: '1px solid #1a1a1a', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <GraduationCap size={24} color="#f97316" /> {selectedGoal.title}
                            </h2>
                            <Zap size={20} color="#f97316" />
                        </div>
                        <div style={{ background: '#050505', padding: '1.5rem', borderRadius: '16px', border: '1px solid #111', whiteSpace: 'pre-wrap', color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            {selectedGoal.description || "No roadmap generated for this goal yet."}
                        </div>
                        <button className="btn-sidebar-action" style={{ marginTop: '2rem', width: '100%' }} onClick={() => setSelectedGoal(null)}>
                            CLOSE ROADMAP
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
