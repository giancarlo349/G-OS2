
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AppState } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div className="text-red-600 font-mono text-xl animate-pulse">
          INITIALIZING_CRIMSON_TERMINAL...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {!user ? <Login /> : <Dashboard user={user} />}
    </div>
  );
};

export default App;
