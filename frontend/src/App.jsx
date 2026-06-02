import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {

    axios
      .get('http://localhost:5000/api/tasks')
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => {
        console.error(error)
      })

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />

        <Route
          path="/task/:id"
          element={
            <TaskDetail
              tasks={tasks}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App