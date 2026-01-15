import React, { useState, useContext } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Calendar from "./components/Calendar";
import { VerifyEmailView } from "./components/VerifyEmailView";
import { AuthContext } from "./context/AuthContext";

const App = () => {

  const { user, logout, loading } = useContext(AuthContext);
  const [view, setView] = useState('login');
  const [tempEmail, setTempEmail] = useState('');

  if (loading) return null;


  if (user) {
    return <Calendar onLogout={logout} />;
  }

  return (
      <>
        {view === 'login' && (
            <Login
                onLogin={() => {}}
                onSwitchToRegister={() => setView('register')}
            />
        )}

        {view === 'register' && (
            <Register
                onRegister={(email) => {
                  setTempEmail(email);
                  setView('verify');
                }}
                onSwitchToLogin={() => setView('login')}
            />
        )}

        {view === 'verify' && (
            <VerifyEmailView
                email={tempEmail}
                onSwitchToLogin={() => setView('login')}
            />
        )}
      </>
  );
};

export default App;