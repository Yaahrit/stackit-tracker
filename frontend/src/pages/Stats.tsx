import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Database, Zap, Shield, BarChart2, Sparkles } from 'lucide-react'
import { Technology, Stack } from '../types'
import { AiInsights } from '../components/ui/AiInsights'

interface StatsProps {
    stacks: Stack[];
    techs: Technology[];
    goals: any[];
}

export const Stats = ({ stacks, techs, goals }: StatsProps) => {
    const [productivity, setProductivity] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProductivity = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:8080/api/ai/productivity-insight', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        count: stacks.length,
                        input: techs.map(t => t.name).join(', '),
                        goalCount: goals.length
                    })
                });
                if (res.ok) setProductivity(await res.text());
            } catch (e) {
                console.error('AI Productivity Error:', e);
            } finally {
                setLoading(true);
            }
        };
        fetchProductivity();
    }, [stacks.length, techs.length, goals.length]);

    // Simulated data for charts
    const techDistribution = [
        { name: 'Frontend', count: techs.filter(t => t.category === 'Frontend').length, color: 'var(--accent-blue)' },
        { name: 'Backend', count: techs.filter(t => t.category === 'Backend').length, color: 'var(--accent-emerald)' },
        { name: 'DevOps', count: techs.filter(t => t.category === 'DevOps').length, color: 'var(--accent-purple)' },
        { name: 'Database', count: techs.filter(t => t.category === 'Database').length, color: 'var(--accent-amber)' },
    ];

    const maxCount = Math.max(...techDistribution.map(d => d.count), 1);

    return (
        <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Core Analytics</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Cross-stack performance and linguistic distribution analysis</p>
                </div>
                <div style={{ background: 'rgba(249, 115, 22, 0.05)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={16} color="#f97316" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f97316' }}>AI DRIVEN INSIGHTS</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <MetricCard icon={<Database size={20} color="var(--accent-blue)" />} label="Total Assets" value={techs.length} trend="+12% vs last month" />
                <MetricCard icon={<Zap size={20} color="var(--accent-emerald)" />} label="Ecosystems" value={stacks.length} trend="+2 new" />
                <MetricCard icon={<Shield size={20} color="var(--accent-purple)" />} label="Mastery Score" value="85%" trend="Optimal" />
                <MetricCard icon={<BarChart2 size={20} color="var(--accent-amber)" />} label="Deployments" value="124" trend="Active" />
            </div>

            <div style={{ marginBottom: '3rem' }}>
                <AiInsights type="productivity" data={productivity} title="Developer Productivity Analysis" />
            </div>

            <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '2rem' }}>
                <div className="card-panel" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: 'var(--text-dim)' }}>TECHNOLOGY DISTRIBUTION</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {techDistribution.map((d, i) => (
                            <div key={d.name} style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                                    <span style={{ fontWeight: 600 }}>{d.name.toUpperCase()}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>{d.count} Assets</span>
                                </div>
                                <div style={{ height: '8px', background: '#1c1c1c', borderRadius: '4px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(d.count / maxCount) * 100}%` }}
                                        transition={{ delay: i * 0.1, duration: 1 }}
                                        style={{ height: '100%', background: d.color, borderRadius: '4px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: 'var(--text-dim)', alignSelf: 'flex-start' }}>PROFICIENCY OVERVIEW</h3>
                    <div style={{ position: 'relative', width: '220px', height: '220px' }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#1c1c1c" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45" fill="none"
                                stroke="var(--accent-blue)" strokeWidth="8"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 * (1 - 0.85) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>85%</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>MASTERED</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MetricCard = ({ icon, label, value, trend }: any) => (
    <div className="card-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label.toUpperCase()}</p>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{value}</h4>
            <p style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>{trend}</p>
        </div>
    </div>
)
