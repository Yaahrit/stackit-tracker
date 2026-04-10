import { Search, Bell, Settings, LogOut, User, Moon, Sun, ChevronDown, Layers, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserProfile, ViewType } from '../../types'

interface TopBarProps {
    searchQuery: string;
    onSearchChange: (q: string) => void;
    activeDropdown: string | null;
    setActiveDropdown: (id: string | null) => void;
    onViewChange: (v: ViewType) => void;
    userProfile: UserProfile;
    theme: 'dark' | 'light';
    toggleTheme: (theme: 'dark' | 'light') => void;
    onLogout: () => void;
    onMenuClick?: () => void;
}

export const TopBar = ({ searchQuery, onSearchChange, activeDropdown, setActiveDropdown, onViewChange, userProfile, theme, toggleTheme, onLogout, onMenuClick }: TopBarProps) => {

    const toggleDropdown = (e: React.MouseEvent, type: string) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === type ? null : type);
    };

    return (
        <header className="top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button className="mobile-menu-btn" onClick={onMenuClick} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
                    <Layers size={24} />
                </button>
                <div className="search-hollow" style={{ width: '320px' }}>
                    <Search size={16} color="var(--text-muted)" />
                    <input value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search tech, projects, or docs..." />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ position: 'relative' }}>
                    <div
                        className="profile-trigger"
                        onClick={(e: any) => toggleDropdown(e, 'profile')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.4rem 0.8rem', borderRadius: '12px', background: activeDropdown === 'profile' ? 'var(--bg-panel)' : 'transparent', transition: 'all 0.2s' }}
                    >
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f97316', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.75rem' }}>
                            <img src={userProfile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.name || 'AD'}`} alt="avatar" />
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{userProfile?.name || 'Alex Dev'}</span>
                        <ChevronDown size={14} color="var(--text-muted)" style={{ transform: activeDropdown === 'profile' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </div>

                    <AnimatePresence>
                        {activeDropdown === 'profile' && (
                            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="dropdown-card" style={{ width: '240px', right: 0, top: 'calc(100% + 10px)' }}>
                                <div className="dropdown-header">
                                    <h4 style={{ margin: 0 }}>Account</h4>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>{userProfile?.email || 'alex@stackit.dev'}</p>
                                </div>

                                <div className="dropdown-item" onClick={() => onViewChange('Profile')}>
                                    <User size={14} /> <span>User Profile</span>
                                </div>
                                <div className="dropdown-item" onClick={() => onViewChange('Dashboard')}>
                                    <Bell size={14} /> <span>Notifications</span>
                                    <span style={{ marginLeft: 'auto', background: '#f97316', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>3</span>
                                </div>
                                <div className="dropdown-item" onClick={() => onViewChange('Settings')}>
                                    <Settings size={14} /> <span>Global Settings</span>
                                </div>

                                <div style={{ margin: '0.5rem 0', borderTop: '1px solid var(--border-dim)' }}></div>

                                <div className="dropdown-item" onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')} style={{ justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                                        <span>Appearance</span>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase' }}>{theme}</span>
                                </div>

                                <div style={{ margin: '0.5rem 0', borderTop: '1px solid var(--border-dim)' }}></div>

                                <div className="dropdown-item" style={{ color: '#ef4444' }} onClick={onLogout}>
                                    <LogOut size={14} /> <span>Sign Out</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}

const IconBadge = ({ icon, count, onClick }: any) => (
    <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-dim)', display: 'flex' }} onClick={onClick}>
        {icon}
        {count ? <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#f97316', color: 'white', fontSize: '10px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span> : null}
    </div>
)
