import { useState } from 'react'
import { Plus, Search, Info } from 'lucide-react'
import { Technology } from '../types'

interface TechStackProps {
    techs: Technology[];
    onAdd: () => void;
}

export const TechStack = ({ techs, onAdd }: TechStackProps) => {
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

    const filteredTechs = activeFilter === 'All'
        ? techs
        : techs.filter(t => t.category === activeFilter);

    return (
        <div className="tech-stack-container">
            <header className="tech-stack-header">
                <div className="tech-stack-title">
                    <h1>Technology Stack</h1>
                    <p className="tech-stack-subtitle">Centralize and monitor your architectural ecosystem.</p>
                </div>
                <button className="btn-new-tech" onClick={onAdd}>
                    <Plus size={20} /> New Tech
                </button>
            </header>

            <div className="filter-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="tech-grid">
                {filteredTechs.map(t => (
                    <div key={t.id} className="tech-card">
                        <div className="tech-card-header">
                            <div className="tech-icon-wrapper">
                                <img
                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}/${t.icon}-original.svg`}
                                    alt={`${t.name} icon`}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (!target.src.includes('plain')) {
                                            target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.icon}/${t.icon}-plain.svg`;
                                        } else {
                                            target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${t.name}&backgroundColor=f97316&fontFamily=Inter&fontWeight=700`;
                                        }
                                    }}
                                />
                            </div>
                            <div className="tech-card-title">
                                <h3>{t.name}</h3>
                                <span className="tech-card-category">{t.description || t.category}</span>
                            </div>
                        </div>

                        <div className="mastery-section">
                            <div className="mastery-header">
                                <span className="mastery-label">Mastery Score</span>
                                <span className="mastery-percentage">{t.mastery}%</span>
                            </div>
                            <div className="mastery-bar-track">
                                <div className="mastery-bar-fill" style={{ width: `${t.mastery}%` }}></div>
                            </div>
                        </div>

                        <div className="tech-card-stats">
                            <div className="tech-stat-item">
                                <span className="tech-stat-label">{t.name === 'AWS' ? 'Region' : 'Version'}</span>
                                <span className="tech-stat-value">{t.version}</span>
                            </div>
                            <div className="tech-stat-item">
                                <span className="tech-stat-label">Active Assets</span>
                                <span className="tech-stat-value">{t.activeAssets}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
