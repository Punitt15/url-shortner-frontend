import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Register from './pages/register/Register'
import ProtectedRoute from './components/protected-route/ProtectedRoute'

function App() {
 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
