import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import useLocalStorage from '../hooks/useLocalStorage'

const initialTasks = [
  { id: 1, titre: "Conception de l'ontologie", description: 'Rédiger les axiomes de base du domaine.', statut: 'A faire' },
  { id: 2, titre: 'Développement API', description: 'Créer les endpoints REST du backend.', statut: 'En cours' },
  { id: 3, titre: 'Tests unitaires', description: 'Couvrir les fonctions critiques.', statut: 'Termine' },
]

function Dashboard({ tasks, setTasks }) {
  const [editTask, setEditTask] = useState(null)

  const afaire  = tasks.filter(t => t.statut === 'A faire').length
  const encours = tasks.filter(t => t.statut === 'En cours').length
  const termine = tasks.filter(t => t.statut === 'Termine').length

  function handleAdd(t)    { setTasks([...tasks, t]) }
  function handleDelete(id){ setTasks(tasks.filter(t => t.id !== id)) }
  function handleUpdate(t) { setTasks(tasks.map(x => x.id === t.id ? t : x)); setEditTask(null) }

  const statCard = (num, label, color) => (
    <div style={{ background:'rgba(0,255,100,0.05)', border:'1px solid #00ff6622', borderRadius:'10px', padding:'12px', textAlign:'center' }}>
      <div style={{ fontSize:'22px', fontWeight:700, color }}>{num}</div>
      <div style={{ fontSize:'11px', color:'#4caf50', marginTop:'2px' }}>{label}</div>
    </div>
  )

  return (
    <div style={{ maxWidth:'680px', margin:'0 auto', padding:'2rem 1rem' }}>
      <div style={{ textAlign:'center', marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'2rem', fontWeight:700, background:'linear-gradient(90deg,#00ff88,#00cc66)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'2px' }}>⚡ TaskFlow</h1>
        <p style={{ color:'#4caf50', fontSize:'13px', marginTop:'4px', letterSpacing:'1px' }}>Gestionnaire de tâches d'équipe</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'1.5rem' }}>
        {statCard(tasks.length, 'Total', '#00ff88')}
        {statCard(encours, 'En cours', '#4fc3f7')}
        {statCard(afaire, 'À faire', '#ffc107')}
      </div>
      <TaskForm onAddTask={handleAdd} editTask={editTask} onUpdateTask={handleUpdate} onCancelEdit={() => setEditTask(null)} />
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={setEditTask} />
      ))}
    </div>
  )
}
export default Dashboard