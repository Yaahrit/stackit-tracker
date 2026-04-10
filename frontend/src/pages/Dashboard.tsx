import { useState, useEffect } from 'react'
import { Download, Plus, Target, Code, Layers, Zap, CheckCircle2, Clock, AlertCircle, Sparkles } from 'lucide-react'
import { Stack, Technology, Goal } from '../types'
import { AiInsights } from '../components/ui/AiInsights'

interface DashboardProps {
    stacks: Stack[];
    techs: Technology[];
    goals: Goal[];
    onNewTech: () => void;
    onViewProjects: () => void;
    onExport: () => void;
}

export const Dashboard = ({ stacks, techs, goals, onNewTech, onViewProjects, onExport }: DashboardProps) => {
    const [recommendations, setRecommendations] = useState<any>(null);
    const [loadingAi, setLoadingAi] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoadingAi(true);
            try {
                const res = await fetch('http://localhost:8080/api/ai/recommend-skills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        input: techs.map(t => t.name).join(', '),
                        secondaryInput: stacks.map(s => s.name).join(', ')
                    })
                });
                if (res.ok) setRecommendations(await res.text());
            } catch (e) {
                console.error('AI Fetch Error:', e);
            } finally {
                setLoadingAi(false);
            }
        };
        if (techs.length > 0) fetchRecommendations();
    }, [techs, stacks]);

    // Take top techs for mastery - ensure we have at least 4 items if possible
    const masteryTechs = techs.length > 0 ? [...techs].sort((a, b) => b.mastery - a.mastery).slice(0, 4) : [];

    // Take first 3 active projects - prioritize Production/Staging if needed
    const activeProjects = stacks.length > 0 ? stacks.slice(0, 3) : [];

    // Categorized goals - if Skill/KPI list is empty, just take any goals to fill space
    let quarterlyGoals = goals.filter(g => g.category === 'Skill' || g.category === 'KPI').slice(0, 2);
    if (quarterlyGoals.length === 0 && goals.length > 0) {
        quarterlyGoals = goals.slice(0, 2);
    }

    return (
        <div style={{ padding: '0 1rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage your technology ecosystem and active services.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-sidebar-action" onClick={onExport} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', height: '44px', padding: '0 1.5rem' }}>
                        <Download size={18} /> Export
                    </button>
                    <button className="btn-sidebar-action" onClick={onNewTech} style={{ height: '44px', padding: '0 1.5rem' }}>
                        <Plus size={18} /> New Tech
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="dashboard-mastery-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(249, 115, 22, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                                <Code size={20} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Tech Stack Mastery</h3>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>+12% Growth</span>
                    </div>

                    {masteryTechs.map(t => (
                        <div key={t.id} className="mastery-item-row">
                            <div className="mastery-item-label">
                                <span>{t.name}</span>
                                <span>{t.mastery}%</span>
                            </div>
                            <div className="mastery-bar-track-dashboard">
                                <div className="mastery-bar-fill-dashboard" style={{ width: `${t.mastery}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-goals-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(249, 115, 22, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                            <Target size={20} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Quarterly Goals</h3>
                    </div>

                    {quarterlyGoals.map(g => (
                        <div key={g.id} className="goal-item-dashboard">
                            <div className="goal-icon-box">
                                {g.status === 'MASTERED' ? <CheckCircle2 size={20} /> : (g.status === 'IN_PROGRESS' ? <Clock size={20} /> : <AlertCircle size={20} />)}
                            </div>
                            <div className="goal-info-dashboard">
                                <h4>{g.title}</h4>
                                <p>Target: {g.category === 'Skill' ? 'End of Q3' : 'Operational Milestone'}</p>
                                <div className={`goal-status-badge ${g.status === 'MASTERED' ? 'complete' : 'on-track'}`}>
                                    {g.status === 'MASTERED' ? 'Complete' : 'On Track'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
                <div className="active-projects-container">
                    <div className="active-projects-header" style={{ marginTop: 0 }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Active Projects</h2>
                        <button className="view-all-link" onClick={onViewProjects} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>View all projects</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {activeProjects.map(s => (
                            <div key={s.id} className="project-card-v2">
                                <span className={`badge ${s.status === 'HEALTHY' ? 'running' : ''}`}>{s.status === 'HEALTHY' ? 'Running' : s.status}</span>
                                <div className="project-icon-box-v2">
                                    <Zap size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>{s.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.2rem', height: '3.2rem', overflow: 'hidden' }}>{s.description || "Core infrastructure service managing real-time data streams."}</p>

                                <div className="project-tags">
                                    {s.technologies.slice(0, 3).map(t => (
                                        <span key={t.id} className="project-tag">{t.name}</span>
                                    ))}
                                </div>

                                <div className="project-footer-v2">
                                    <div style={{ display: 'flex', marginLeft: '0.25rem' }}>
                                        {[1, 2].map(i => (
                                            <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#27272a', border: '2px solid #0c0c0c', marginLeft: '-8px' }}></div>
                                        ))}
                                    </div>
                                    <span className="footer-update">Updated 2h ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="ai-assistant-sidebar">
                    <div style={{ background: 'rgba(249, 115, 22, 0.03)', border: '1px solid rgba(249, 115, 22, 0.1)', borderRadius: '24px', padding: '1.5rem', position: 'sticky', top: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <Sparkles size={18} color="#f97316" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>AI Career Assistant</h3>
                        </div>

                        {loadingAi ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#555' }}>
                                <Zap size={24} className="animate-pulse" style={{ margin: '0 auto 1rem', display: 'block' }} />
                                Analysing Stack...
                            </div>
                        ) : (
                            <AiInsights type="skills" data={recommendations} title="Suggested Tech" />
                        )}

                        <div style={{ marginTop: '1rem', padding: '1rem', background: '#080808', borderRadius: '16px', border: '1px solid #111' }}>
                            <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5', margin: '0 0 1rem 0' }}>
                                Recommendations based on your current proficiency in <strong>{techs.length} technologies</strong> and <strong>{stacks.length} active projects</strong>.
                            </p>
                            <button className="btn-sidebar-action" onClick={onExport} style={{ width: '100%', justifyContent: 'center', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.2)', fontSize: '0.8rem' }}>
                                <Download size={14} /> Generate Project Report
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
