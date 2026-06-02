import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import axios from 'axios'



function Dashboard({ tasks, setTasks }) {
  const [editTask, setEditTask] = useState(null)

  const afaire = tasks.filter(t => t.status === 'A faire').length
  const encours = tasks.filter(t => t.status === 'En cours').length
  const termine = tasks.filter(t => t.status === 'Termine').length

  async function handleAdd(t) {

  try {

    const response = await axios.post(
      'http://localhost:5000/api/tasks',
      {
        title: t.titre,
        description: t.description,
        status: t.statut
      }
    )

    setTasks([...tasks, response.data])

  } catch (error) {

    console.error(error)

  }

}
  async function handleDelete(id) {

  try {

    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`
    )

    setTasks(
      tasks.filter(task => task._id !== id)
    )

  } catch (error) {

    console.error(error)

  }

}
  async function handleUpdate(t) {

  try {

    const response = await axios.put(
      `http://localhost:5000/api/tasks/${t._id}`,
      {
        status: t.statut
      }
    )

    setTasks(
      tasks.map(task =>
        task._id === t._id
          ? response.data
          : task
      )
    )

    setEditTask(null)

  } catch (error) {

    console.error(error)

  }

}

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