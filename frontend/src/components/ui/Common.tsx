import { Database } from 'lucide-react'

export const SmallStat = ({ value, label, icon }: any) => (
    <div className="small-stat-card">
        <div style={{ width: '32px', height: '32px', background: '#1c1c1c', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{label}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{value}</p>
        </div>
    </div>
)

export const TechRow = ({ name, level, progress, status, color, initials }: any) => (
    <tr style={{ borderBottom: '1px solid #141414' }}>
        <td style={{ padding: '1.25rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '32px', height: '32px', background: '#1c1c1c', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color }}>{initials}</div>
                <div><p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{name}</p><p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{level}</p></div>
            </div>
        </td>
        <td><div className="proficiency-bar-track"><div className="proficiency-bar-fill" style={{ width: `${progress}%`, background: color }}></div></div></td>
        <td><span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', background: `${color}15`, color }}>{status}</span></td>
        <td>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
                {[4, 7, 5, 8, 6].map((h, i) => <div key={i} style={{ width: '3px', height: `${h * 2}px`, background: color, borderRadius: '1px', opacity: 0.2 + i * 0.1 }}></div>)}
            </div>
        </td>
    </tr>
)

export const MinimalProject = ({ name, progress }: any) => (
    <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
            <span>{name}</span>
            <span style={{ color: 'var(--text-muted)' }}>{progress}%</span>
        </div>
        <div style={{ height: '3px', background: '#1c1c1c', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-blue)', borderRadius: '2px' }}></div>
        </div>
    </div>
)
