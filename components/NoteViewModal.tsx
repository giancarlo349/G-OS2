
import React from 'react';
import { Note } from '../types';

interface NoteViewModalProps {
  note: Note;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteViewModal: React.FC<NoteViewModalProps> = ({ note, onClose, onEdit, onDelete }) => {
  const formattedDate = new Date(note.updatedAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '900px', width: '90%', height: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div className="progress-bar-container" style={{ position: 'absolute', top: 0, left: 0 }}>
            <div className="progress-bar-fill"></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.6rem', color: '#ff0000', letterSpacing: '2px', display: 'block', marginBottom: '5px' }}>
              PROTOCOLO_DETALHADO // CID_{note.id.toUpperCase()}
            </span>
            <h2 className="glitch-text" style={{ fontSize: '2.2rem', color: '#ff0000' }}>{note.title}</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={onClose} className="btn btn-small" style={{ width: '40px', padding: '5px' }}>X</button>
          </div>
        </div>

        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          background: 'rgba(255, 0, 0, 0.02)', 
          border: '1px solid rgba(255, 0, 0, 0.1)',
          padding: '30px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1rem',
          lineHeight: '1.8',
          color: '#ff4444',
          whiteSpace: 'pre-wrap',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          {/* Subtle line decoration for stationery feel */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10px',
            bottom: 0,
            width: '1px',
            background: 'rgba(255, 0, 0, 0.05)'
          }}></div>
          {note.content}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderTop: '1px solid var(--primary-dim)', 
          paddingTop: '1.5rem',
          fontSize: '0.75rem'
        }}>
          <div style={{ color: 'var(--primary-dim)' }}>
            <div style={{ marginBottom: '4px' }}><span style={{ color: '#800' }}>IDENTIFICAÇÃO_RESPONSÁVEL:</span> {note.author.toUpperCase()}</div>
            <div><span style={{ color: '#800' }}>ÚLTIMA_SINCRONIZAÇÃO:</span> {formattedDate}</div>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={onDelete} className="btn btn-small danger" style={{ minWidth: '120px' }}>RASGAR_DADOS</button>
            <button onClick={onEdit} className="btn btn-small" style={{ minWidth: '120px' }}>REESCREVER</button>
          </div>
        </div>

        {/* Decorative elements to fill space */}
        <div style={{ 
          position: 'absolute', 
          bottom: '10px', 
          left: '10px', 
          fontSize: '0.5rem', 
          opacity: 0.2,
          pointerEvents: 'none'
        }}>
          NOVA REAL TERMINAL // ENCRYPTION_STABLE // GIANCARLO_OS_v2
        </div>
      </div>
    </div>
  );
};

export default NoteViewModal;
