import { useParams, Link } from 'react-router-dom'

const badgeStyle = {
  'A faire':  { background:'rgba(255,193,7,0.15)',  color:'#ffc107' },
  'En cours': { background:'rgba(0,150,255,0.15)', color:'#4fc3f7' },
  'Termine':  { background:'rgba(0,255,100,0.15)', color:'#00ff88' },
}

function TaskDetail({ tasks }) {
  const { id } = useParams()
  const task = tasks.find(t => t.id === Number(id))

  if (!task) return (
    <div style={{ maxWidth:'600px', margin:'4rem auto', padding:'2rem', textAlign:'center' }}>
      <p style={{ color:'#ff6b6b', marginBottom:'1rem' }}>Tâche introuvable.</p>
      <Link to="/" style={{ color:'#00ff88' }}>← Retour</Link>
    </div>
  )

  return (
    <div style={{ maxWidth:'600px', margin:'3rem auto', padding:'1rem' }}>
      <Link to="/" style={{ color:'#4caf50', fontSize:'14px', textDecoration:'none' }}>← Retour au Dashboard</Link>
      <div style={{ background:'rgba(0,20,0,0.8)', border:'1px solid #00ff6644', borderLeft:'4px solid #00ff88', borderRadius:'16px', padding:'2rem', marginTop:'1.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
          <h1 style={{ fontSize:'1.4rem', fontWeight:700, color:'#e0ffe0' }}>{task.titre}</h1>
          <span style={{ fontSize:'12px', padding:'4px 14px', borderRadius:'20px', fontWeight:600, ...badgeStyle[task.statut] }}>{task.statut}</span>
        </div>
        <div style={{ borderTop:'1px solid #00ff6622', paddingTop:'1rem' }}>
          <p style={{ fontSize:'13px', color:'#4caf50', marginBottom:'4px' }}>Description</p>
          <p style={{ color:'#c0e0c0', lineHeight:1.6 }}>{task.description}</p>
        </div>
        <div style={{ marginTop:'1rem', fontSize:'12px', color:'#4caf50' }}>ID : {task.id}</div>
      </div>
    </div>
  )
}
export default TaskDetail