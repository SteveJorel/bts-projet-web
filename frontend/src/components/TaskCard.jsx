import { Link } from 'react-router-dom'

const badgeStyle = {
  'A faire':  { background:'rgba(255,193,7,0.15)',  color:'#ffc107', border:'1px solid #ffc10744' },
  'En cours': { background:'rgba(0,150,255,0.15)', color:'#4fc3f7', border:'1px solid #4fc3f744' },
  'Termine':  { background:'rgba(0,255,100,0.15)', color:'#00ff88', border:'1px solid #00ff8844' },
}

function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div style={{ background:'rgba(0,20,0,0.7)', border:'1px solid #00ff6644', borderLeft:'3px solid #00ff88', borderRadius:'14px', padding:'1.2rem', marginBottom:'12px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
        <span style={{ fontSize:'15px', fontWeight:600, color:'#e0ffe0' }}>{task.title}</span>
        <span style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'20px', fontWeight:600, ...badgeStyle[task.status] }}>{task.status}</span>
      </div>
      <p style={{ fontSize:'13px', color:'#7cb87c', marginBottom:'12px', lineHeight:1.5 }}>{task.description}</p>
      <div style={{ display:'flex', gap:'8px' }}>
        <button onClick={() => onEdit(task)} style={{ background:'rgba(0,150,255,0.1)', border:'1px solid #4fc3f744', borderRadius:'6px', padding:'5px 14px', color:'#4fc3f7', fontSize:'12px', cursor:'pointer' }}>✏ Modifier</button>
        <button onClick={() => onDelete(task._id)} style={{ background:'rgba(255,60,60,0.1)', border:'1px solid #ff444444', borderRadius:'6px', padding:'5px 14px', color:'#ff6b6b', fontSize:'12px', cursor:'pointer' }}>✕ Supprimer</button>
        <Link to={`/task/${task._id}`} style={{ marginLeft:'auto', background:'rgba(0,255,100,0.1)', border:'1px solid #00ff6644', borderRadius:'6px', padding:'5px 14px', color:'#00ff88', fontSize:'12px', textDecoration:'none' }}>→ Détail</Link>
      </div>
    </div>
  )
}
export default TaskCard