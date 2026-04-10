import { Database, Home, Code, Layers, Target, Plus, Zap, Moon, Sun, HelpCircle } from 'lucide-react'
import { ViewType } from '../../types'
import { UserProfile } from '../../types' // Assuming UserProfile is also from '../../types'

interface SidebarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    onNewProject: () => void;
    userProfile?: UserProfile;
    theme: 'dark' | 'light';
    toggleTheme: (theme: 'dark' | 'light') => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar = ({ currentView, onViewChange, onNewProject, userProfile, theme, toggleTheme, isOpen, onClose }: SidebarProps) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '3.5rem', padding: '0 0.4rem' }}>
                    <div style={{ width: '38px', height: '38px', background: '#f97316', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layers size={22} color="white" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', margin: 0 }}>StackIt</h1>
                        <p style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 600, margin: 0 }}>Dev Ecosystem</p>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <NavItem icon={<Home size={20} />} label="Dashboard" active={currentView === 'Dashboard'} onClick={() => onViewChange('Dashboard')} />
                    <NavItem icon={<Code size={20} />} label="Tech Stack" active={currentView === 'Tech Stack'} onClick={() => onViewChange('Tech Stack')} />
                    <NavItem icon={<Layers size={20} />} label="Projects" active={currentView === 'Projects'} onClick={() => onViewChange('Projects')} />
                    <NavItem icon={<Target size={20} />} label="Goals" active={currentView === 'Goals'} onClick={() => onViewChange('Goals')} />
                    <NavItem icon={<HelpCircle size={20} />} label="Viva Prep" active={currentView === 'Viva Prep'} onClick={() => onViewChange('Viva Prep')} />
                </nav>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0 0.5rem' }}>
                <button className="btn-sidebar-action" onClick={onNewProject} style={{ padding: '0.75rem', height: '44px', borderRadius: '12px', background: '#f97316', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <Plus size={18} /> New Project
                </button>

                {userProfile && (
                    <div className="sidebar-profile-card" onClick={() => onViewChange('Profile')} style={{ cursor: 'pointer' }}>
                        <div className="profile-main-info">
                            <div className="profile-avatar-mini">
                                <img src={userProfile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`} alt="avatar" />
                            </div>
                            <div className="profile-text">
                                <h5>{userProfile.name}</h5>
                                <p>{userProfile.role}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    )
}

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
        {icon}
        <span>{label}</span>
    </div>
)
