import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, AlertCircle } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';

interface UserProfile {
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    const token = localStorage.getItem('auth_token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const openAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock validation
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    // Mock successful login - Retrieve signed up user if exists, or use default mock name
    let name = 'John Doe';
    const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
    const matchedUser = existingUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    
    if (matchedUser) {
      name = matchedUser.name;
    }

    const userProfile = { name, email };
    localStorage.setItem('auth_token', 'mock_jwt_token_xyz123');
    localStorage.setItem('user_profile', JSON.stringify(userProfile));
    
    setUser(userProfile);
    setIsAuthenticated(true);
    closeAuthModal();
  };

  const signUp = async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (!name.trim()) {
      throw new Error('Name is required.');
    }
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    // Mock signup persistence
    const existingUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
    if (existingUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(existingUsers));

    const userProfile = { name, email };
    localStorage.setItem('auth_token', 'mock_jwt_token_xyz123');
    localStorage.setItem('user_profile', JSON.stringify(userProfile));

    setUser(userProfile);
    setIsAuthenticated(true);
    closeAuthModal();
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signUp,
        logout,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        tab={authModalTab}
        setTab={setAuthModalTab}
        onLogin={login}
        onSignUp={signUp}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- AuthModal Component ---

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab: 'login' | 'signup';
  setTab: (tab: 'login' | 'signup') => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (name: string, email: string, password: string) => Promise<void>;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  tab,
  setTab,
  onLogin,
  onSignUp,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Clear inputs and error on modal close or tab switch
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setError(null);
  }, [tab, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        await onLogin(email, password);
      } else {
        await onSignUp(name, email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tab === 'login' ? 'Sign In to AutoCareer' : 'Create Your Account'}
      size="sm"
    >
      <div className="flex flex-col gap-5">
        {/* Toggle tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
              tab === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
              tab === 'signup'
                ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
            }`}
          >
            Get Started
          </button>
        </div>

        {/* Info statement */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-primary-500/5 border border-primary-500/10 text-xs text-primary-600 dark:text-primary-400">
          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            {tab === 'login'
              ? 'Access your autonomous job-applying pilot and overview dashboard.'
              : 'Set up your master profile details to launch your AI application agent.'}
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-xs text-red-650 dark:text-red-400">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === 'signup' && (
            <Input
              label="Full Name"
              type="text"
              placeholder="Alex Rivera"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="alex.rivera@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={loading}
          >
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400 dark:text-slate-550 mt-1">
          {tab === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('signup')}
                className="font-bold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              >
                Sign Up Free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('login')}
                className="font-bold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};
