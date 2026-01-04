
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('deemo@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError('ACESSO_NEGADO: ' + (err.message || 'Credenciais Inválidas'));
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="auth-box">
      <div className="progress-bar-container"><div className="progress-bar-fill"></div></div>
      <h1 className="glitch-text" style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.4rem' }}>
        NOVA REAL
      </h1>
      <p style={{ fontSize: '0.65rem', textAlign: 'center', marginBottom: '0.5rem', color: '#ff0000', letterSpacing: '3px' }}>
        GERENCIAMENTO DE INFORMAÇÕES
      </p>
      <p style={{ fontSize: '0.55rem', textAlign: 'center', marginBottom: '2rem', opacity: 0.5, letterSpacing: '1px' }}>
        PROTOCOLOS // MÉTODOS // CLIENTES
      </p>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>IDENTIFICADOR_VIRTUAL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@novareal"
            required
          />
        </div>
        <div className="input-group">
          <label>CHAVE_CRIPTOGRÁFICA</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>

        {error && (
          <div style={{ color: '#f00', fontSize: '0.7rem', marginBottom: '1.5rem', padding: '10px', border: '1px solid #f00', background: 'rgba(50,0,0,0.6)' }}>
            [!] {error}
          </div>
        )}

        <button type="submit" className="btn" disabled={isAuthenticating}>
          {isAuthenticating ? 'INICIANDO_MÉTODOS...' : 'DESBLOQUEAR_TERMINAL'}
        </button>
      </form>

      <div style={{ marginTop: '2.5rem', fontSize: '0.6rem', color: '#700', borderTop: '1px solid #300', paddingTop: '15px', textAlign: 'center' }}>
        PLATAFORMA EXCLUSIVA - DESENVOLVIDA POR GIANCARLO
      </div>
    </div>
  );
};

export default Login;
