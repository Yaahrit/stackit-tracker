import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'

export const TechModal = ({ isOpen, onClose, onSubmit }: any) => {
    const [name, setName] = useState('');
    const [cat, setCat] = useState('Frontend');
    const [desc, setDesc] = useState('');
    const [mastery, setMastery] = useState(50);
    const [version, setVersion] = useState('');
    const [assets, setAssets] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(name, cat, desc, mastery, version, assets);
        onClose();
        // Reset fields
        setName('');
        setCat('Frontend');
        setDesc('');
        setMastery(50);
        setVersion('');
        setAssets(0);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(12px)' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#0c0c0c', border: '1px solid var(--border-dim)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '450px', maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 style={{ marginBottom: '2rem', fontSize: '1.6rem', fontWeight: 700 }}>Register New Technology</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <p className="tech-stat-label" style={{ marginBottom: '0.5rem' }}>TECH NAME</p>
                            <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. React" />
                        </div>
                        <div>
                            <p className="tech-stat-label" style={{ marginBottom: '0.5rem' }}>CATEGORY</p>
                            <select className="form-input" value={cat} onChange={e => setCat(e.target.value)} style={{ appearance: 'none' }}>
                                {['Frontend', 'Backend', 'DevOps', 'Database', 'Mobile', 'AI'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <p className="tech-stat-label" style={{ marginBottom: '0.5rem' }}>DESCRIPTION / SUBTITLE</p>
                        <input className="form-input" value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. Component-based UI library" />
                    </div>

                    <div>
                        <p className="tech-stat-label" style={{ marginBottom: '0.5rem' }}>MASTERY SCORE (%)</p>
                        <input type="range" min="0" max="100" value={mastery} onChange={e => setMastery(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#ea580c' }} />
                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#ea580c', fontWeight: 700 }}>{mastery}%</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <p className="tech-stat-label" style={{ marginBottom: '0.5rem' }}>VERSION / REGION</p>
                            <input className="form-input" value={version} onChange={e => setVersion(e.target.value)} placeholder="e.g. 18.2.0" />
                        </div>
                        <div>
                            <p className="tech-stat-label" style={{ marginBottom: '0.5rem' }}>ACTIVE ASSETS</p>
                            <input type="number" className="form-input" value={assets} onChange={e => setAssets(parseInt(e.target.value))} />
                        </div>
                    </div>

                    <button className="btn-new-tech" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} onClick={handleSubmit}>
                        <Check size={20} /> REGISTER ASSET
                    </button>

                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', marginTop: '0.5rem' }} onClick={onClose}>
                        Discard Configuration
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
