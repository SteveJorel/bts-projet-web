import { useState, useEffect } from 'react'

const inp = { width:'100%', background:'rgba(0,0,0,0.5)', border:'1px solid #00ff6633', borderRadius:'8px', padding:'10px 14px', color:'#e0ffe0', fontSize:'14px', outline:'none' }
const lbl = { display:'block', fontSize:'12px', color:'#4caf50', marginBottom:'4px', letterSpacing:'0.5px' }

function TaskForm({ onAddTask, editTask, onUpdateTask, onCancelEdit }) {
  const [titre, setTitre]             = useState('')
  const [description, setDescription] = useState('')
  const [statut, setStatut]           = useState('A faire')

  useEffect(() => {
    if (editTask) {
      setTitre(editTask.titre)
      setDescription(editTask.description)
      setStatut(editTask.statut)
    } else {
      setTitre(''); setDescription(''); setStatut('A faire')
    }
  }, [editTask])

  function handleSubmit() {
    if (!titre.trim()) return
    if (editTask) {
      onUpdateTask({ ...editTask, titre, description, statut })
    } else {
      onAddTask({ id: Date.now(), titre, description, statut })
    }
    setTitre(''); setDescription(''); setStatut('A faire')
  }

  return (
    <div style={{ background:'rgba(0,255,100,0.04)', border:'1px solid #00ff6644', borderRadius:'16px', padding:'1.5rem', marginBottom:'2rem' }}>
      <h2 style={{ color:'#00ff88', fontSize:'14px', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'1rem' }}>
        {editTask ? '✏ Modifier la tâche' : '+ Nouvelle tâche'}
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'10px' }}>
        <div><label style={lbl}>Titre</label><input style={inp} value={titre} onChange={e => setTitre(e.target.value)} placeholder="Nom de la tâche..." /></div>
        <div><label style={lbl}>Statut</label>
          <select style={inp} value={statut} onChange={e => setStatut(e.target.value)}>
            <option>A faire</option><option>En cours</option><option>Termine</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom:'12px' }}><label style={lbl}>Description</label><textarea style={{...inp, resize:'vertical'}} rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Décrivez la tâche..." /></div>
      <div style={{ display:'flex', gap:'8px' }}>
        <button onClick={handleSubmit} style={{ flex:1, background:'linear-gradient(135deg,#00cc66,#009944)', border:'none', borderRadius:'8px', padding:'10px', color:'#fff', fontWeight:600, fontSize:'14px', cursor:'pointer' }}>
          {editTask ? 'Mettre à jour' : 'Ajouter la tâche'}
        </button>
        {editTask && <button onClick={onCancelEdit} style={{ background:'rgba(255,60,60,0.1)', border:'1px solid #ff444444', borderRadius:'8px', padding:'10px 20px', color:'#ff6b6b', fontSize:'14px', cursor:'pointer' }}>Annuler</button>}
      </div>
    </div>
  )
}
export default TaskForm