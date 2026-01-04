
import React, { useState, useEffect, useMemo } from 'react';
import { User, signOut } from 'firebase/auth';
import { ref, onValue, push, set, remove, update } from 'firebase/database';
import { auth, db } from '../services/firebase';
import { Note } from '../types';
import NoteItem from './NoteItem';
import NoteModal from './NoteModal';
import NoteViewModal from './NoteViewModal';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteIdToDelete, setNoteIdToDelete] = useState<string | null>(null);
  const [sysLogs, setSysLogs] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      "VINCULANDO_TERMINAL_NOVA_REAL...",
      "CARREGANDO_PROTOCOLOS_DE_CLIENTE...",
      "SISTEMA_GIANCARLO_PRONTO_v2.0",
      "MONITORANDO_LINKS_DE_ACESSO...",
      "CAIXA_OPERACIONAL: ONLINE"
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setSysLogs(prev => [...prev, logs[i]].slice(-6));
        i++;
      }
    }, 2500);

    const notesRef = ref(db, `notes/${user.uid}`);
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notesList: Note[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNotes(notesList.sort((a, b) => b.updatedAt - a.updatedAt));
      } else {
        setNotes([]);
      }
      setLoading(false);
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [user.uid]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const handleLogout = () => signOut(auth);

  const handleSaveNote = async (noteData: Partial<Note>) => {
    const timestamp = Date.now();
    setSysLogs(prev => [...prev, `REGISTRANDO_MÉTODO_0x${timestamp.toString(16).toUpperCase()}`].slice(-6));
    if (editingNote) {
      const noteRef = ref(db, `notes/${user.uid}/${editingNote.id}`);
      await update(noteRef, { ...noteData, updatedAt: timestamp });
    } else {
      const notesRef = ref(db, `notes/${user.uid}`);
      const newNoteRef = push(notesRef);
      await set(newNoteRef, {
        title: noteData.title || 'Novo_Protocolo_Cliente',
        content: noteData.content || '',
        author: noteData.author || 'Giancarlo',
        updatedAt: timestamp,
      });
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const confirmDelete = async () => {
    if (noteIdToDelete) {
      setSysLogs(prev => [...prev, `ARQUIVANDO_REGISTRO_${noteIdToDelete.slice(0,6)}`].slice(-6));
      const noteRef = ref(db, `notes/${user.uid}/${noteIdToDelete}`);
      await remove(noteRef);
      setNoteIdToDelete(null);
      setViewingNote(null);
    }
  };

  const openEditFromView = (note: Note) => {
    setViewingNote(null);
    setEditingNote(note);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <header className="dashboard-header">
        <div>
          <h1 className="glitch-text" style={{ fontSize: '2.2rem' }}>NOVA REAL - CENTRAL</h1>
          <p style={{ fontSize: '0.7rem', opacity: 0.6, letterSpacing: '1px' }}>USER_AUTH: {user.email} | ADMIN: GIANCARLO</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => { setEditingNote(null); setIsModalOpen(true); }} className="btn btn-small">
            NOVO_MÉTODO
          </button>
          <button onClick={handleLogout} className="btn btn-small danger">
            LOGOUT_SECURE
          </button>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="FILTRAR_POR_CLIENTE_OU_PROTOCOLO..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="progress-bar-container" style={{ marginTop: '10px' }}>
           <div className="progress-bar-fill"></div>
        </div>
      </div>

      {loading ? (
        <div className="loading-screen" style={{ height: '300px' }}>BUSCANDO_DADOS_NO_SERVIDOR...</div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteItem 
              key={note.id} 
              note={note} 
              onEdit={() => { setEditingNote(note); setIsModalOpen(true); }}
              onDelete={() => setNoteIdToDelete(note.id)}
              onView={() => setViewingNote(note)}
            />
          ))}
        </div>
      )}

      <div className="system-logs">
        {sysLogs.map((log, idx) => (
          <div key={idx} style={{ opacity: (idx + 1) / sysLogs.length, marginBottom: '3px' }}>
            {`> ${log}`}
          </div>
        ))}
        <div style={{ marginTop: '8px', fontWeight: 'bold', color: 'red' }}>NOVA REAL v2.0 // BY GIANCARLO</div>
      </div>

      {isModalOpen && (
        <NoteModal 
          isOpen={isModalOpen}
          note={editingNote}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
        />
      )}

      {viewingNote && (
        <NoteViewModal
          note={viewingNote}
          onClose={() => setViewingNote(null)}
          onEdit={() => openEditFromView(viewingNote)}
          onDelete={() => setNoteIdToDelete(viewingNote.id)}
        />
      )}

      {noteIdToDelete && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ border: '2px solid red', maxWidth: '420px' }}>
            <h2 className="glitch-text" style={{ color: 'red', marginBottom: '1.5rem' }}>[!] DESTRUIR_DADOS</h2>
            <p style={{ fontSize: '0.85rem', marginBottom: '2rem', lineHeight: '1.5' }}>
              Confirmar a destruição permanente do registro <span style={{color: 'white'}}>{noteIdToDelete.slice(0,8)}</span>?
              Esta ação é IRREVERSÍVEL no banco de dados da Nova Real.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setNoteIdToDelete(null)} className="btn btn-small">ABORTAR</button>
              <button onClick={confirmDelete} className="btn btn-small danger">EXECUTAR_WIPE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
