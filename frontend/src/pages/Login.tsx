import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Mail, Lock, Github, Chrome } from 'lucide-react';
import { authService } from '../services/auth';

interface LoginProps {
    onLoginSuccess: () => void;
    onNavigateToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authService.login({ email, password });
            onLoginSuccess();
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-card"
            >
                <div className="auth-brand">
                    <div className="auth-brand-logo">
                        <Database size={24} color="white" />
                    </div>
                    <h1>StackIt</h1>
                </div>

                <div className="auth-header">
                    <h2>Welcome back</h2>
                    <p>Access your Core Analytics dashboard</p>
                </div>

                {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="alex.rivera@stackit.io"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ accentColor: 'var(--accent-blue)' }} /> Remember me
                        </label>
                        <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Forgot password?</span>
                    </div>

                    <button type="submit" className="auth-btn-primary" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="divider" style={{ margin: '2rem 0' }}>
                    <span>Or continue with</span>
                </div>

                <button className="social-btn" style={{ width: '100%', marginBottom: '2rem' }}>
                    <Github size={18} /> SSO Corporate
                </button>

                <div className="auth-footer">
                    Don't have an account?
                    <span className="auth-link" onClick={onNavigateToSignup}>Sign up for free</span>
                </div>
            </motion.div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Contact Support</span>
            </div>
        </div>
    );
};
