import React from 'react'
import { AppHeader } from '@/components'
import { NotificationProvider } from '@/providers/notification-provider'
import { Route, Routes } from 'react-router-dom'
import { ForgotPasswordPage, HomePage, LoginPage, RegisterPage, ResetPasswordPage } from '@/pages'
import { ProtectedPageWithProtected } from '@/pages/protected'

const Layout: React.FC = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/protected" element={<ProtectedPageWithProtected isAuthenticated={false} />} />
        </Routes>
      </main>
    </>
  )
}

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <Layout />
    </NotificationProvider>
  )
}

export default App
