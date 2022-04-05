import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<Navigate replace to="/dashboard" />} />
    </Routes>
  )
}

export default App;
