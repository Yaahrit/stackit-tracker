import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, ChevronRight, MessageSquare, BookOpen, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VivaQuestion {
    question: string;
    answer: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const VivaPrep = () => {
    const [questions, setQuestions] = useState<VivaQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/ai/viva-prep', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ input: 'Java, React, PostgreSQL, Spring Boot' })
                });
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching viva questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const difficultyColor = (diff: string) => {
        switch (diff) {
            case 'Beginner': return 'text-emerald-400 bg-emerald-400/10';
            case 'Intermediate': return 'text-amber-400 bg-amber-400/10';
            case 'Advanced': return 'text-rose-400 bg-rose-400/10';
            default: return 'text-blue-400 bg-blue-400/10';
        }
    };

    return (
        <div className="viva-prep-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="page-header" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '12px', color: '#f97316' }}>
                        <Trophy size={28} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'white' }}>AI Viva Prep</h1>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>AI-generated questions to prepare you for your major project evaluation.</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                    <div className="loader"></div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Questions List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <HelpCircle size={20} color="#f97316" /> Top Interview Questions
                        </h3>
                        {questions.map((q, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setSelectedIdx(idx)}
                                style={{
                                    padding: '1.5rem',
                                    background: selectedIdx === idx ? 'rgba(249, 115, 22, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                    border: `1px solid ${selectedIdx === idx ? '#f97316' : 'var(--border-dim)'}`,
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 600, color: selectedIdx === idx ? 'white' : 'var(--text-dim)' }}>
                                        {q.question}
                                    </span>
                                    <span className={`difficulty-badge ${difficultyColor(q.difficulty)}`} style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase'
                                    }}>
                                        {q.difficulty}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Answer Preview */}
                    <AnimatePresence mode="wait">
                        {selectedIdx !== null ? (
                            <motion.div
                                key={selectedIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{
                                    padding: '2.5rem',
                                    background: 'rgba(249, 115, 22, 0.03)',
                                    border: '1px solid rgba(249, 115, 22, 0.2)',
                                    borderRadius: '24px',
                                    height: 'fit-content',
                                    position: 'sticky',
                                    top: '2rem'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#f97316' }}>
                                    <CheckCircle2 size={24} />
                                    <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>AI Suggested Answer</span>
                                </div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3, color: 'white' }}>
                                    {questions[selectedIdx].question}
                                </h2>
                                <div style={{
                                    padding: '1.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: '16px',
                                    lineHeight: 1.7,
                                    color: 'var(--text-dim)',
                                    fontSize: '1.1rem'
                                }}>
                                    {questions[selectedIdx].answer}
                                </div>

                                <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', borderLeft: '4px solid #f97316' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                        <AlertCircle size={16} />
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>EXAMINER'S TIP</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}> Mention implementation details specific to your local environment for extra credits.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '5rem',
                                border: '2px dashed var(--border-dim)',
                                borderRadius: '24px',
                                color: 'var(--text-muted)'
                            }}>
                                <HelpCircle size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>Select a question to view the AI-suggested answer and preparation tips.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};
