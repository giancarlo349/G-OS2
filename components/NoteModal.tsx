
import React, { useState, useEffect } from 'react';
import { Note } from '../types';

interface NoteModalProps {
  isOpen: boolean;
  note: Note | null;
  onClose: () => void;
  onSave: (noteData: Partial<Note>) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, note, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setAuthor(note.author);
    } else {
      setTitle('');
      setContent('');
      setAuthor('Giancarlo');
    }
  }, [note]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, content, author });
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="progress-bar-container" style={{ position: 'absolute', top: 0, left: 0 }}>
            <div className="progress-bar-fill"></div>
        </div>
        
        <h2 className="glitch-text" style={{ marginBottom: '2.5rem', textAlign: 'center', fontSize: '1.8rem' }}>
          {note ? 'EDITAR_MÉTODO_CLIENTE' : 'NOVO_REGISTRO_DE_CLIENTE'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.6rem', color: '#ff0000', marginBottom: '5px', display: 'block' }}>NOME_DO_CLIENTE_/_IDENTIFICADOR</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Cliente Alpha - Fluxo de Dados"
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.6rem', color: '#ff0000', marginBottom: '5px', display: 'block' }}>TÉCNICO_RESPONSÁVEL</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Giancarlo"
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '0.6rem', color: '#ff0000', marginBottom: '5px', display: 'block' }}>PROTOCOLOS_MÉTODOS_E_LINKS</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ height: '180px', lineHeight: '1.6', resize: 'none' }}
              placeholder="Descreva aqui os procedimentos, senhas temporárias e links importantes para este cliente..."
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button type="button" onClick={onClose} className="btn" style={{ background: 'rgba(255,0,0,0.05)', border: '1px solid #400' }}>CANCELAR</button>
            <button type="submit" className="btn">SALVAR_NA_CENTRAL</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
