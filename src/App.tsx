import React from 'react'
import { AppHeader } from '@/components'
import { NotificationProvider } from '@/providers/notification-provider'
import { Route, Routes } from 'react-router-dom'
import {
  ForgotPasswordPage,
  HistoryPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  OrderPageWithProtected,
  OrdersPageWithProtected,
  ProfilePageWithProtected,
  RegisterPage,
  ResetPasswordPage
} from '@/pages'

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
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/profile" element={<ProfilePageWithProtected isAuthenticated={false} />} />
          <Route path="/profile/orders" element={<OrdersPageWithProtected isAuthenticated={false} />} />
          <Route path="/profile/orders/:id" element={<OrderPageWithProtected isAuthenticated={false} />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
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
