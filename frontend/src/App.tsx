import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { TechModal } from './components/ui/TechModal'
import { ProjectModal } from './components/ui/ProjectModal'
import { Dashboard } from './pages/Dashboard'
import { TechStack } from './pages/TechStack'
import { Projects } from './pages/Projects'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { Stats } from './pages/Stats'
import { Goals } from './pages/Goals'
import { VivaPrep } from './pages/VivaPrep'
import { Splash } from './pages/Splash'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { authService } from './services/auth'
import { Technology, Stack, ViewType, UserProfile, Goal } from './types'

function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'signup'>('login');

    const [stacks, setStacks] = useState<Stack[]>([]);
    const [techs, setTechs] = useState<Technology[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [currentView, setCurrentView] = useState<ViewType>('Dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: 'Developer',
        role: 'Full Stack Engineer',
        bio: 'Passionate about building modern web applications and exploring new technologies.'
    });

    // Modal States
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [isAddingTech, setIsAddingTech] = useState(false);
    const [editingProject, setEditingProject] = useState<Stack | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Form States
    const [formName, setFormName] = useState('');
    const [formDesc, setFormDesc] = useState('');
    const [formUrl, setFormUrl] = useState('');
    const [formStatus, setFormStatus] = useState('HEALTHY');
    const [formCategory, setFormCategory] = useState('Production');
    const [formUptime, setFormUptime] = useState(99.98);
    const [formLatency, setFormLatency] = useState(42);
    const [formHealthScore, setFormHealthScore] = useState(84);
    const [formRequests, setFormRequests] = useState('12.4k/hr');
    const [formMemoryUsage, setFormMemoryUsage] = useState(94);
    const [formIops, setFormIops] = useState('2.1k/s');
    const [selectedTechIds, setSelectedTechIds] = useState<number[]>([]);

    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = (newTheme: 'dark' | 'light') => setTheme(newTheme);

    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const auth = authService.isAuthenticated();
        setIsAuthenticated(auth);
        if (auth) {
            const user = authService.getCurrentUser();
            if (user) {
                if (user.fullName) {
                    setUserProfile(prev => ({ ...prev, name: user.fullName, email: user.email }));
                }
                fetchStacks();
                fetchTechs();
                fetchProfile(user.email);
                fetchGoals();
            }
        }
    }, [isAuthenticated]);

    const fetchStacks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/stacks');
            if (response.ok) setStacks(await response.json());
        } catch (error) { console.error('Error fetching stacks:', error); }
    };

    const fetchTechs = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/technologies');
            if (response.ok) setTechs(await response.json());
        } catch (error) { console.error('Error fetching techs:', error); }
    };

    const fetchProfile = async (email?: string) => {
        if (!email) return;
        try {
            const res = await fetch(`http://localhost:8080/api/profiles/email/${email}`);
            if (res.ok) {
                const data = await res.json();
                if (data) setUserProfile(data);
            }
        } catch (error) { console.error('Profile fetch error:', error); }
    };

    const fetchGoals = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/goals');
            if (res.ok) setGoals(await res.json());
        } catch (error) { console.error('Goals fetch error:', error); }
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setAuthView('login');
    };

    const updateProfile = async (profile: UserProfile) => {
        try {
            const url = profile.id ? `http://localhost:8080/api/profiles/${profile.id}` : 'http://localhost:8080/api/profiles';
            const method = profile.id ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            if (res.ok) setUserProfile(await res.json());
        } catch (error) { console.error('Profile update error:', error); }
    };

    const handleProjectSubmit = async () => {
        if (!formName) return;
        setLoading(true);
        const selectedTechObjects = techs.filter(t => selectedTechIds.includes(t.id));
        const url = editingProject ? `http://localhost:8080/api/stacks/${editingProject.id}` : 'http://localhost:8080/api/stacks';
        const method = editingProject ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formName,
                    description: formDesc,
                    technologies: selectedTechObjects,
                    url: formUrl,
                    status: formStatus,
                    category: formCategory,
                    uptime: editingProject ? formUptime : 99.9,
                    latency: editingProject ? formLatency : 35,
                    healthScore: editingProject ? formHealthScore : 88,
                    requests: editingProject ? formRequests : "1.2k/hr",
                    memoryUsage: editingProject ? formMemoryUsage : 45,
                    iops: editingProject ? formIops : "400/s"
                })
            });
            if (response.ok) {
                fetchStacks();
                closeModals();
            }
        } catch (error) { console.error('Error submitting project:', error); }
        finally { setLoading(false); }
    };

    const handleExport = () => {
        const data = {
            stacks,
            techs,
            goals,
            profile: userProfile,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `stackit-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project ecosystem?')) return;
        try {
            const response = await fetch(`http://localhost:8080/api/stacks/${id}`, { method: 'DELETE' });
            if (response.ok) fetchStacks();
        } catch (error) { console.error('Error deleting project:', error); }
    };

    const handleAddTech = async (name: string, category: string, description: string, mastery: number, version: string, activeAssets: number) => {
        try {
            let icon = name.toLowerCase().replace(/\s+/g, '').replace(/[.-]/g, '');
            if (icon === 'aws') icon = 'amazonwebservices';
            if (icon === 'tailwind') icon = 'tailwindcss';
            if (icon === 'postgres' || icon === 'postgresql') icon = 'postgresql';
            const response = await fetch('http://localhost:8080/api/technologies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, category, icon, description, mastery, version, activeAssets })
            });
            if (response.ok) fetchTechs();
        } catch (error) { console.error('Error adding tech:', error); }
    };

    const closeModals = () => {
        setIsAddingProject(false);
        setIsAddingTech(false);
        setEditingProject(null);
        setFormName('');
        setFormDesc('');
        setFormUrl('');
        setFormStatus('HEALTHY');
        setFormCategory('Production');
        setSelectedTechIds([]);
    };

    const openEditModal = (stack: Stack) => {
        setEditingProject(stack);
        setFormName(stack.name);
        setFormDesc(stack.description);
        setFormUrl(stack.url || '');
        setFormStatus(stack.status || 'HEALTHY');
        setFormCategory(stack.category || 'Production');
        setFormUptime(stack.uptime || 99.98);
        setFormLatency(stack.latency || 42);
        setFormHealthScore(stack.healthScore || 84);
        setFormRequests(stack.requests || '12.4k/hr');
        setFormMemoryUsage(stack.memoryUsage || 94);
        setFormIops(stack.iops || '2.1k/s');
        setSelectedTechIds(stack.technologies.map(t => t.id));
        setIsAddingProject(true);
    };

    const filteredStacks = useMemo(() =>
        stacks.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())),
        [stacks, searchQuery]);

    const filteredTechs = useMemo(() =>
        techs.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase())),
        [techs, searchQuery]);

    if (showSplash) return <Splash onComplete={() => setShowSplash(false)} />;

    if (!isAuthenticated) {
        return authView === 'login' ? (
            <Login
                onLoginSuccess={() => setIsAuthenticated(true)}
                onNavigateToSignup={() => setAuthView('signup')}
            />
        ) : (
            <Signup
                onSignupSuccess={() => setAuthView('login')}
                onNavigateToLogin={() => setAuthView('login')}
            />
        );
    }

    return (
        <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar
                currentView={currentView}
                onViewChange={(v) => {
                    setCurrentView(v);
                    setIsSidebarOpen(false);
                }}
                onNewProject={() => setIsAddingProject(true)}
                userProfile={userProfile}
                theme={theme}
                toggleTheme={toggleTheme}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="main-wrapper">
                <TopBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    onViewChange={setCurrentView}
                    userProfile={userProfile}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onLogout={handleLogout}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '5rem' }}>
                    <AnimatePresence mode="wait">
                        {currentView === 'Dashboard' && (
                            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <Dashboard
                                    stacks={filteredStacks}
                                    techs={filteredTechs}
                                    goals={goals}
                                    onNewTech={() => setIsAddingTech(true)}
                                    onViewProjects={() => setCurrentView('Projects')}
                                    onExport={handleExport}
                                />
                            </motion.div>
                        )}
                        {currentView === 'Tech Stack' && (
                            <motion.div key="tech" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <TechStack techs={filteredTechs} onAdd={() => setIsAddingTech(true)} />
                            </motion.div>
                        )}
                        {currentView === 'Projects' && (
                            <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <Projects
                                    stacks={filteredStacks}
                                    onEdit={openEditModal}
                                    onDelete={handleDeleteProject}
                                    onNewProject={() => setIsAddingProject(true)}
                                />
                            </motion.div>
                        )}
                        {currentView === 'Profile' && (
                            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Profile profile={userProfile} onUpdate={updateProfile} />
                            </motion.div>
                        )}
                        {currentView === 'Settings' && (
                            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Settings profile={userProfile} theme={theme} onThemeChange={toggleTheme} />
                            </motion.div>
                        )}
                        {currentView === 'Stats' && (
                            <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Stats stacks={stacks} techs={techs} goals={goals} />
                            </motion.div>
                        )}
                        {currentView === 'Goals' && (
                            <motion.div key="goals" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Goals goals={goals} onRefresh={fetchGoals} />
                            </motion.div>
                        )}
                        {currentView === 'Viva Prep' && (
                            <motion.div key="viva" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <VivaPrep />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <ProjectModal
                isOpen={isAddingProject} onClose={closeModals} onSubmit={handleProjectSubmit}
                editingStack={editingProject} techs={techs}
                name={formName} setName={setFormName} desc={formDesc} setDesc={setFormDesc}
                url={formUrl} setUrl={setFormUrl} category={formCategory} setCategory={setFormCategory}
                status={formStatus} setStatus={setFormStatus}
                selectedIds={selectedTechIds} setSelectedIds={setSelectedTechIds} loading={loading}
            />

            <TechModal isOpen={isAddingTech} onClose={closeModals} onSubmit={handleAddTech} />
        </div>
    );
}

export default App
