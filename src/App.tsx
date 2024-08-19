import React from 'react'
import styles from './app.module.css'
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
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/reset-password" element={<ResetPasswordPage />}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
            <Route path="/protected" element={<ProtectedPageWithProtected isAuthenticated={false} />}/>
          </Routes>
        </div>
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
