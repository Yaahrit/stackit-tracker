import { motion } from 'framer-motion'
import { X, Zap, Cpu } from 'lucide-react'
import { Technology } from '../../types'

export const ProjectModal = ({
    isOpen, onClose, onSubmit, editingStack, techs,
    name, setName, desc, setDesc,
    url, setUrl, category, setCategory, status, setStatus,
    selectedIds, setSelectedIds, loading
}: any) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(12px)' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#0c0c0c', border: '1px solid var(--border-dim)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '650px', maxHeight: '95vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{editingStack ? 'Refine Project Ecosystem' : 'Initialize New Project'}</h2>
                    <X size={24} onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <Label>PROJECT IDENTIFIER</Label>
                            <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Main-API-Service" />
                        </div>
                        <div className="form-group">
                            <Label>DEPLOYMENT DOMAIN / URL</Label>
                            <input className="form-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="e.g. api.acmecorp.com" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <Label>STRATEGIC CATEGORY</Label>
                            <select className="form-input" value={category} onChange={e => setCategory(e.target.value)} style={{ appearance: 'none' }}>
                                {['Production', 'Staging', 'Legacy', 'Experimental'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <Label>OPERATIONAL STATUS</Label>
                            <select className="form-input" value={status} onChange={e => setStatus(e.target.value)} style={{ appearance: 'none' }}>
                                {['HEALTHY', 'SYNCING', 'DEGRADED'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                            <Label>MISSION OBJECTIVE</Label>
                            <button
                                onClick={async () => {
                                    if (!name) return alert('Enter project name first!');
                                    try {
                                        const res = await fetch('http://localhost:8080/api/ai/suggest-description', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ input: name })
                                        });
                                        if (res.ok) setDesc(await res.text());
                                    } catch (e) { console.error(e); }
                                }}
                                style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '20px', padding: '2px 10px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                                <Zap size={10} /> AI INFUSE
                            </button>
                        </div>
                        <textarea className="form-input" rows={2} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the project vision..." />
                    </div>

                    <div className="form-group">
                        <Label>ARCHITECTURE LAYERS (TECHNOLOGIES)</Label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', maxHeight: '120px', overflowY: 'auto', padding: '12px', background: '#070707', borderRadius: '12px', border: '1px solid #1a1a1a' }}>
                            {techs.map((t: Technology) => (
                                <button
                                    key={t.id}
                                    onClick={() => setSelectedIds((prev: number[]) => prev.includes(t.id) ? prev.filter((id: number) => id !== t.id) : [...prev, t.id])}
                                    style={{
                                        padding: '5px 12px', borderRadius: '8px', border: '1px solid #222', fontSize: '0.75rem', cursor: 'pointer',
                                        background: selectedIds.includes(t.id) ? '#2563eb' : '#111', color: selectedIds.includes(t.id) ? 'white' : 'var(--text-dim)',
                                        transition: 'all 0.2s'
                                    }}>
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            className="btn-sidebar-action"
                            style={{ flex: 1, padding: '1rem', height: 'auto', background: 'rgba(255,255,255,0.05)', border: '1px solid #333' }}
                            onClick={async () => {
                                if (!name) return alert('Enter project identifier first!');
                                try {
                                    const selectedTechNames = techs.filter((t: any) => selectedIds.includes(t.id)).map((t: any) => t.name).join(', ');
                                    const res = await fetch('http://localhost:8080/api/ai/check-compatibility', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            frontend: selectedTechNames.includes('React') ? 'React' : 'SPA',
                                            backend: selectedTechNames.includes('Node') ? 'Node.js' : 'REST API',
                                            db: selectedTechNames.includes('Postgres') ? 'PostgreSQL' : 'Database'
                                        })
                                    });
                                    if (res.ok) alert(await res.text());
                                } catch (e) { console.error(e); }
                            }}
                        >
                            <Cpu size={18} /> CHECK COMPATIBILITY
                        </button>
                        <button className="btn-sidebar-action" style={{ flex: 1.5, padding: '1rem', height: 'auto' }} onClick={onSubmit} disabled={loading}>
                            {loading ? 'SYNCING ARCHITECTURE...' : (editingStack ? 'UPDATE DEPLOYMENT' : 'CONFIRM INITIALIZATION')}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const Label = ({ children }: any) => <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>{children}</p>;
