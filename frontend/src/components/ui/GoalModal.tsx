import { motion } from 'framer-motion'
import { X, Check, Zap } from 'lucide-react'
import { useState } from 'react'
import { Goal } from '../../types'

interface GoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (goal: Omit<Goal, 'id' | 'progress' | 'status'>) => void;
}

export const GoalModal = ({ isOpen, onClose, onSubmit }: GoalModalProps) => {
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('Frontend');
    const [desc, setDesc] = useState('');
    const [difficulty, setDifficulty] = useState<'Low' | 'Medium' | 'High'>('Medium');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title || !desc) return;
        onSubmit({ title, tech, description: desc, difficulty });
        onClose();
        // Reset form
        setTitle('');
        setTech('Frontend');
        setDesc('');
        setDifficulty('Medium');
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(12px)' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#0c0c0c', border: '1px solid var(--border-dim)', borderRadius: '20px', padding: '3rem', width: '100%', maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Define Technical Objective</h2>
                    <X size={24} onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <Label>OBJECTIVE TITLE</Label>
                        <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Master Kubernetes" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <Label>CATEGORY</Label>
                            <select className="form-input" value={tech} onChange={e => setTech(e.target.value)}>
                                {['Frontend', 'Backend', 'DevOps', 'Database', 'Mobile', 'AI'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <Label>COMPLEXITY</Label>
                            <select className="form-input" value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                            <Label>MISSION DESCRIPTION</Label>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await fetch('http://localhost:8080/api/ai/generate-roadmap', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ input: title || tech })
                                        });
                                        if (res.ok) setDesc(await res.text());
                                    } catch (e) { console.error(e); }
                                }}
                                style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '20px', padding: '2px 10px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                                <Zap size={10} /> AI ROADMAP
                            </button>
                        </div>
                        <textarea className="form-input" rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="What are the key learning outcomes?" />
                    </div>

                    <button className="btn-sidebar-action" style={{ marginTop: '1rem' }} onClick={handleSubmit}>
                        <Check size={18} /> INITIALIZE GOAL
                    </button>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }} onClick={onClose}>
                        Abort Operation
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

const Label = ({ children }: any) => <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>{children}</p>;
