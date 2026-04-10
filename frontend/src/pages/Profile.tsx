import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    ExternalLink,
    MessageSquare,
    Github,
    Gitlab,
    MapPin,
    Mail,
    CheckCircle2,
    Star,
    GitFork,
    Code2,
    Sparkles,
    BarChart3,
    ArrowUpRight,
    Camera
} from 'lucide-react'
import { UserProfile } from '../types'

interface ProfileProps {
    profile: UserProfile;
    onUpdate: (profile: UserProfile) => void;
}

export const Profile = ({ profile, onUpdate }: ProfileProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile>(profile);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isEditing) {
            setFormData(profile);
        }
    }, [profile, isEditing]);

    const handleSave = () => {
        onUpdate(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    const handleAvatarClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Mock data for the demonstration based on screenshot
    const stats = {
        commits: "2,481",
        pullRequests: "124",
        commitProgress: 85,
        prProgress: 45
    };

    const projects = [
        {
            title: "HyperScale CRM",
            desc: "Enterprise-ready CRM engine built for high-throughput data processing and...",
            tags: ["React", "Go"],
            stars: "1.2k",
            forks: "234"
        },
        {
            title: "Sentient.js",
            desc: "Lightweight natural language processing library for browser-based...",
            tags: ["Python", "ML"],
            stars: "856",
            forks: "89"
        }
    ];

    const activities = [
        {
            title: "Merged PR #452 into <span>core-api</span>",
            time: "2 hours ago • \"Feature: Add Redis caching layer to auth endpoints\"",
            desc: "Optimized response times by 40% for frequent authentication requests."
        },
        {
            title: "Opened Issue #128 on <span>hyper-ui-kit</span>",
            time: "Yesterday • \"Bug: Dropdown menu alignment on mobile viewport\"",
            desc: "Identified a rendering quirk on Safari iOS where menus were overflowing."
        },
        {
            title: "Created repository <span>next-auth-template</span>",
            time: "3 days ago • \"Starter template for Next.js with comprehensive auth logic\"",
            desc: "Standardizing our internal authentication flow for new client projects."
        }
    ];

    return (
        <div className="profile-dashboard">
            {/* Profile Hero */}
            <header className="profile-hero">
                <div 
                    className={`profile-avatar-wrapper ${isEditing ? 'editing' : ''}`}
                    onClick={handleAvatarClick}
                >
                    <div className="profile-avatar-inner">
                        <img 
                            src={formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} 
                            alt="Profile Avatar" 
                        />
                        {isEditing && (
                            <div className="profile-avatar-overlay">
                                <Camera size={24} className="avatar-upload-icon" />
                                <span className="avatar-upload-text">Change Photo</span>
                            </div>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="profile-info" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        {isEditing ? (
                            <input
                                className="form-input"
                                style={{ fontSize: '3rem', fontWeight: 800, padding: '0.5rem', marginBottom: '1.25rem', height: 'auto' }}
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        ) : (
                            <h1>{profile.name}</h1>
                        )}

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {isEditing ? (
                                <>
                                    <button
                                        className="auth-btn-primary"
                                        style={{ marginTop: 0, padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="social-btn"
                                        style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="social-btn"
                                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="profile-meta">
                        <div className="profile-meta-item verified">
                            <CheckCircle2 size={18} />
                            {isEditing ? (
                                <input
                                    className="form-input"
                                    style={{ padding: '4px 8px', fontSize: '0.9rem' }}
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                            ) : (
                                <span>{profile.role}</span>
                            )}
                        </div>
                        <div className="profile-meta-item">
                            <MapPin size={18} />
                            {isEditing ? (
                                <input
                                    className="form-input"
                                    style={{ padding: '4px 8px', fontSize: '0.9rem' }}
                                    value={formData.location || ''}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Location"
                                />
                            ) : (
                                <span>{profile.location || "San Francisco, CA"}</span>
                            )}
                        </div>
                        <div className="profile-meta-item">
                            <Mail size={18} />
                            <span>{profile.email}</span>
                        </div>
                    </div>

                    {isEditing ? (
                        <textarea
                            className="form-input"
                            style={{ marginTop: '1rem', minHeight: '100px' }}
                            value={formData.bio}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        />
                    ) : (
                        <p className="profile-bio-text">{profile.bio}</p>
                    )}
                </div>
            </header>

            <div className="profile-grid-layout">
                {/* Left Sidebar Stats */}
                <aside className="profile-sidebar">
                    <div className="profile-side-card">
                        <div className="side-card-header">
                            <BarChart3 size={18} />
                            <span>Contributions</span>
                        </div>
                        <div className="side-card-stat">
                            <span className="label">Total Commits</span>
                            <span className="value">{stats.commits}</span>
                        </div>
                        <div className="stat-progress-track">
                            <div className="stat-progress-fill" style={{ width: `${stats.commitProgress}%` }}></div>
                        </div>

                        <div className="side-card-stat">
                            <span className="label">Pull Requests</span>
                            <span className="value">{stats.pullRequests}</span>
                        </div>
                        <div className="stat-progress-track">
                            <div className="stat-progress-fill" style={{ width: `${stats.prProgress}%`, opacity: 0.6 }}></div>
                        </div>
                    </div>

                    <div className="profile-side-card">
                        <div className="profile-section-title" style={{ marginBottom: '2rem' }}>
                            Connected Accounts
                        </div>
                        <div className="social-account-item">
                            <div className="social-account-info">
                                <div className="social-account-icon">
                                    <Github size={20} />
                                </div>
                                <div>
                                    <span className="social-account-name">GitHub</span>
                                    <span className="social-account-handle">@alex-rivera-dev</span>
                                </div>
                            </div>
                            <ExternalLink size={18} className="text-muted" />
                        </div>
                        <div className="social-account-item">
                            <div className="social-account-info">
                                <div className="social-account-icon">
                                    <Gitlab size={20} color="#fc6d26" />
                                </div>
                                <div>
                                    <span className="social-account-name">GitLab</span>
                                    <span className="social-account-handle">alex.rivera.lab</span>
                                </div>
                            </div>
                            <ExternalLink size={18} className="text-muted" />
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <section className="profile-main-content">
                    <div className="profile-section-title">
                        Featured Projects
                        <span className="view-all">View All</span>
                    </div>

                    <div className="projects-showcase-grid">
                        {projects.map((proj, i) => (
                            <div key={i} className="showcase-project-card">
                                <div className="showcase-card-top">
                                    <div className="showcase-icon-wrapper">
                                        {i === 0 ? <Code2 size={24} /> : <Sparkles size={24} />}
                                    </div>
                                    <div className="showcase-tags">
                                        {proj.tags.map(tag => (
                                            <span key={tag} className="showcase-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <h3>{proj.title}</h3>
                                <p className="showcase-desc">{proj.desc}</p>
                                <div className="showcase-footer">
                                    <div className="showcase-footer-item">
                                        <Star size={16} /> {proj.stars}
                                    </div>
                                    <div className="showcase-footer-item">
                                        <GitFork size={16} /> {proj.forks}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="activity-timeline-card">
                        <div className="feed-header">
                            <h3>Recent Contributions</h3>
                            <span className="range">Last 30 days</span>
                        </div>
                        <div className="activity-list">
                            {activities.map((act, i) => (
                                <div key={i} className="activity-node">
                                    <div className="node-tracker">
                                        <div className="node-point"></div>
                                        <div className="node-connector"></div>
                                    </div>
                                    <div className="node-body">
                                        <h4 className="node-title" dangerouslySetInnerHTML={{ __html: act.title }}></h4>
                                        <p className="node-time">{act.time}</p>
                                        <p className="node-detail">{act.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
