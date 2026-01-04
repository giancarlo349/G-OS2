
import React from 'react';
import { Note } from '../types';

interface NoteItemProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete, onView }) => {
  const formattedDate = new Date(note.updatedAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="note-card" onClick={onView} style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }} onClick={(e) => e.stopPropagation()}>
        <span style={{ fontSize: '0.6rem', color: '#800', letterSpacing: '1px' }}>CID_{note.id.slice(0, 10).toUpperCase()}</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span onClick={onEdit} style={{ cursor: 'pointer', fontSize: '0.65rem', color: '#ff0000', fontWeight: 'bold' }}>[MOD]</span>
          <span onClick={onDelete} style={{ cursor: 'pointer', fontSize: '0.65rem', color: '#500' }}>[DEL]</span>
        </div>
      </div>
      
      <h3 className="glitch-text" style={{ letterSpacing: '1px' }}>{note.title}</h3>
      <p style={{ 
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
      }}>
        {note.content}
      </p>

      <div className="card-footer" style={{ marginTop: '20px' }}>
        <span style={{ fontWeight: 'bold' }}>RESP: {note.author.toUpperCase()}</span>
        <span>MOD: {formattedDate}</span>
      </div>
    </div>
  );
};

export default NoteItem;
