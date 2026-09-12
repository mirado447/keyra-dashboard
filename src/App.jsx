import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationsPage from './pages/ApplicationsPage';
import CreateApplicationPage from './pages/CreateApplicationPage';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import DocumentationPage from './pages/DocumentationPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css'
import LogoutPage from './pages/LogoutPage';
import HomeRedirect from './pages/HomeRedirect';
import NoteFoundPage from './pages/NoteFoundPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeRedirect />} />
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
      <Route 
        path="/applications/new" 
        element={
          <ProtectedRoute>
            <CreateApplicationPage />
          </ProtectedRoute>} 
      />
      <Route 
        path="/applications/:id" 
        element={
          <ProtectedRoute>
            <ApplicationDetailPage />
          </ProtectedRoute>} 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>}
      />
      <Route 
        path="/documentation"
        element={
          <ProtectedRoute>
            <DocumentationPage />
          </ProtectedRoute>}
      /> 
      <Route path='*' element={<NoteFoundPage/> } />
    </Routes>
  )
}

export default App
