// src/components/auth-guard.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import AppShell from '@/components/app-shell'

const AuthGuard: React.FC = () => {
  const { token, user } = useAuth()

  if (!token && user.role !== 'admin') {
    return <Navigate to="/sign-in" replace />
  }

  return <AppShell/>
}

export default AuthGuard;
