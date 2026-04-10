import { useState, useMemo } from 'react'
import {
    MoreHorizontal,
    ExternalLink,
    Terminal,
    Database,
    Server,
    Activity,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Edit3,
    Trash2,
    Plus
} from 'lucide-react'
import { Stack } from '../types'

interface ProjectsProps {
    stacks: Stack[];
    onEdit: (s: Stack) => void;
    onDelete: (id: number) => void;
    onNewProject: () => void;
}

export const Projects = ({ stacks, onEdit, onDelete, onNewProject }: ProjectsProps) => {
    const [activeCategory, setActiveCategory] = useState('All Projects');
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

    const categories = ['All Projects', 'Production', 'Staging', 'Legacy'];

    const filteredStacks = useMemo(() =>
        activeCategory === 'All Projects'
            ? stacks
            : stacks.filter(s => s.category === activeCategory),
        [stacks, activeCategory]);

    const stats = useMemo(() => {
        const healthy = stacks.filter(s => s.status === 'HEALTHY').length;
        const alerts = stacks.filter(s => s.status === 'DEGRADED').length;
        return { healthy, alerts };
    }, [stacks]);

    const getIcon = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('db') || lower.includes('database') || lower.includes('postgres') || lower.includes('mongo')) return <Database size={20} />;
        if (lower.includes('api') || lower.includes('service')) return <Terminal size={20} />;
        return <Server size={20} />;
    };

    return (
        <div className="projects-dashboard">
            <header className="projects-header">
                <h1>Projects Dashboard</h1>
                <p className="projects-subtitle">Real-time overview of your infrastructure and active deployments.</p>
            </header>

            <div className="status-summary-grid">
                <div className="status-summary-card">
                    <div className="status-summary-icon healthy">
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="status-summary-info">
                        <p className="label">Healthy Ecosystems</p>
                        <p className="value">{stats.healthy}</p>
                    </div>
                </div>
                <div className="status-summary-card">
                    <div className="status-summary-icon alerts">
                        <AlertTriangle size={24} />
                    </div>
                    <div className="status-summary-info">
                        <p className="label">Active Alerts</p>
                        <p className="value">{stats.alerts}</p>
                    </div>
                </div>
            </div>

            <div className="filter-tabs" style={{ marginBottom: '3.5rem' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '3rem' }}>
                {filteredStacks.map(s => (
                    <div key={s.id} className="project-card-premium">
                        <div className="project-card-header">
                            <div className="project-icon-status">
                                <div className="project-icon-box">
                                    {getIcon(s.name)}
                                </div>
                                <span className={`status-badge ${(s.status || 'HEALTHY').toLowerCase()}`}>
                                    {s.status || 'HEALTHY'}
                                </span>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <button
                                    className="project-card-menu"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMenuOpenId(menuOpenId === s.id ? null : s.id);
                                    }}
                                >
                                    <MoreHorizontal size={20} />
                                </button>
                                {menuOpenId === s.id && (
                                    <div className="project-menu-dropdown">
                                        <button className="project-menu-item" onClick={() => { onEdit(s); setMenuOpenId(null); }}>
                                            <Edit3 size={16} /> Edit Settings
                                        </button>
                                        <button className="project-menu-item delete" onClick={() => { onDelete(s.id); setMenuOpenId(null); }}>
                                            <Trash2 size={16} /> Delete Project
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="project-card-title">
                            <h3>{s.name}</h3>
                            <a href={`https://${s.url || 'stackit.io'}`} target="_blank" rel="noreferrer" className="project-card-url" onClick={e => e.stopPropagation()}>
                                <ExternalLink size={14} /> {s.url || 'stackit.io'}
                            </a>
                        </div>

                        <div className="project-metrics">
                            <div className="metric-item">
                                <div className="metric-label-value">
                                    <span className="metric-label">Uptime</span>
                                    <span className="metric-value">{s.uptime || 99.9}%</span>
                                </div>
                                <div className="metric-bar-track">
                                    <div className="metric-bar-fill healthy" style={{ width: `${s.uptime || 99.9}%` }}></div>
                                </div>
                            </div>
                            <div className="metric-item">
                                <div className="metric-label-value">
                                    <span className="metric-label">Health Score</span>
                                    <span className="metric-value">{s.healthScore || 85}%</span>
                                </div>
                                <div className="metric-bar-track">
                                    <div
                                        className={`metric-bar-fill ${(s.healthScore || 85) > 80 ? 'healthy' : (s.healthScore || 85) > 50 ? 'warning' : 'danger'}`}
                                        style={{ width: `${s.healthScore || 85}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="project-card-footer">
                            <div className="team-avatars">
                                {[1, 2, 3].map(i => (
                                    <img
                                        key={i}
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}${i}`}
                                        className="team-avatar"
                                        alt="team"
                                    />
                                ))}
                                <div className="team-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#a1a1aa' }}>+4</div>
                            </div>
                            <button className="action-link" onClick={() => onEdit(s)}>
                                View Details <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                <button className="add-project-dashed" onClick={onNewProject}>
                    <div className="add-project-icon">
                        <Plus size={24} />
                    </div>
                    <div className="add-project-text">
                        <h4>Add New Project</h4>
                        <p>Deploy a new architecture layer</p>
                    </div>
                </button>
            </div>
        </div>
    );
};
