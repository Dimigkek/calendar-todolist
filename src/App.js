import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Calendar from "./components/Calendar";

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
      return <Calendar onLogout={handleLogout} />;

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