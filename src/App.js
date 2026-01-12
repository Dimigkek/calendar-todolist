import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Dashboard from './components/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setView('login');
  };

  if (isAuthenticated) {
    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-black mb-4">Welcome to Your Premium Planner</h1>
          <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl hover:bg-red-500/40 transition-all"
          >
            Logout
          </button>
        </div>
    );
  }

  return (
      <>
        {view === 'login' ? (
            <Login
                onLogin={handleLogin}
                onSwitchToRegister={() => setView('register')}
            />
        ) : (
            <Register
                onRegister={() => setView('login')}
                onSwitchToLogin={() => setView('login')}
            />
        )}
      </>
  );
};

export default App;