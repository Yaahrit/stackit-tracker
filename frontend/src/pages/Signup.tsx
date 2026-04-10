import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Github, Chrome } from 'lucide-react';
import { authService } from '../services/auth';

interface SignupProps {
    onSignupSuccess: () => void;
    onNavigateToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignupSuccess, onNavigateToLogin }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authService.signup({ fullName, email, password });
            onSignupSuccess();
        } catch (err: any) {
            setError(err.message || 'Signup failed');
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
                    <h2>Create your developer account</h2>
                    <p>Join the community of elite engineers</p>
                </div>

                {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <div className="social-auth">
                    <button className="social-btn"><Github size={18} /> GitHub</button>
                    <button className="social-btn"><Chrome size={18} /> Google</button>
                </div>

                <div className="divider">
                    <span>Or continue with</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>FULL NAME</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Alex Rivera"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>WORK EMAIL</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="alex@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Must be at least 8 characters with one special character.
                        </p>
                    </div>

                    <button type="submit" className="auth-btn-primary" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?
                    <span className="auth-link" onClick={onNavigateToLogin}>Log in</span>
                </div>
            </motion.div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', maxWidth: '400px' }}>
                By creating an account, you agree to our <span style={{ textDecoration: 'underline' }}>Terms of Service</span> and <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>.
            </div>
        </div>
    );
};
