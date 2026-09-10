import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import LogoutPage from './pages/LogoutPage';

function App() {

  return (
    <Routes>
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/logout' element={<LogoutPage />} />
      <Route
        path='/applications'
        element={
          <ProtectedRoute>
            <ApplicationsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
