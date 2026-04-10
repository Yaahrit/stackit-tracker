import { User, Moon, Sun, Bell, Shield, ChevronRight } from 'lucide-react'
import { UserProfile } from '../types'

interface SettingsProps {
    profile: UserProfile;
    theme: 'dark' | 'light';
    onThemeChange: (theme: 'dark' | 'light') => void;
}

export const Settings = ({ profile, theme, onThemeChange }: SettingsProps) => {
    return (
        <div className="settings-container">
            <header style={{ marginBottom: '3.5rem' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>System Settings</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage your account preferences and application appearance.</p>
            </header>

            <section className="settings-section">
                <h3><User size={20} /> Account Profile</h3>
                <div className="settings-profile-preview">
                    {profile?.avatar ? (
                        <div className="settings-avatar" style={{ overflow: 'hidden' }}>
                            <img src={profile.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ) : (
                        <div className="settings-avatar" style={{ background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>
                            {profile?.name?.substring(0, 2).toUpperCase() || 'AD'}
                        </div>
                    )}
                    <div className="profile-info">
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{profile?.name || 'Alex Dev'}</h4>
                        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0.5rem' }}>{profile?.email || 'alex@stackit.dev'}</p>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f97316', background: 'rgba(249, 115, 22, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                            {profile?.role || 'Full Stack Engineer'}
                        </span>
                    </div>
                </div>

                <div className="setting-row">
                    <div className="setting-info">
                        <h4>Public Profile</h4>
                        <p>Manage how your profile appears to others.</p>
                    </div>
                    <ChevronRight size={20} color="var(--text-muted)" />
                </div>
                <div className="setting-row">
                    <div className="setting-info">
                        <h4>Email Preferences</h4>
                        <p>Update your contact information and basic security.</p>
                    </div>
                    <ChevronRight size={20} color="var(--text-muted)" />
                </div>
            </section>

            <section className="settings-section">
                <h3><Sun size={20} /> Appearance</h3>
                <div className="setting-row">
                    <div className="setting-info">
                        <h4>Interface Theme</h4>
                        <p>Select your preferred visual style for the dashboard.</p>
                    </div>
                    <div className="theme-toggle-group">
                        <button
                            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                            onClick={() => onThemeChange('light')}
                        >
                            <Sun size={16} /> Light
                        </button>
                        <button
                            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                            onClick={() => onThemeChange('dark')}
                        >
                            <Moon size={16} /> Dark
                        </button>
                    </div>
                </div>
                <div className="setting-row">
                    <div className="setting-info">
                        <h4>Compact Mode</h4>
                        <p>Show more information in less vertical space.</p>
                    </div>
                    <div style={{ width: '40px', height: '20px', background: 'var(--bg-panel)', borderRadius: '20px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '2px', left: '2px', width: '16px', height: '16px', background: 'var(--text-muted)', borderRadius: '50%' }}></div>
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h3><Bell size={20} /> Notifications</h3>
                <div className="setting-row">
                    <div className="setting-info">
                        <h4>System Alerts</h4>
                        <p>Receive alerts for deployment failures and security updates.</p>
                    </div>
                    <ChevronRight size={20} color="var(--text-muted)" />
                </div>
            </section>
        </div>
    );
};
