import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow_data', [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
        <Route path="/task/:id" element={<TaskDetail tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App