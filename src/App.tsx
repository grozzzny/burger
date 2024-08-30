import React, { useEffect } from 'react'
import { AppHeader } from '@/components'
import { NotificationProvider } from '@/providers/notification-provider'
import { Route, Routes } from 'react-router-dom'
import {
  ForgotPasswordPageWithProtected,
  HistoryPage,
  HomePage,
  IngredientPage,
  LoginPageWithProtected,
  NotFoundPage,
  OrderPageWithProtected,
  OrdersPageWithProtected,
  ProfilePageWithProtected,
  RegisterPageWithProtected,
  ResetPasswordPageWithProtected
} from '@/pages'
import { useDispatch } from '@/services/store'
import { getUser } from '@/services/auth/actions'

const Layout: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <>
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPageWithProtected limitedAccess={true} />} />
          <Route path="/register" element={<RegisterPageWithProtected limitedAccess={true} />} />
          <Route path="/reset-password" element={<ResetPasswordPageWithProtected limitedAccess={true} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPageWithProtected limitedAccess={true} />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/profile" element={<ProfilePageWithProtected />} />
          <Route path="/profile/orders" element={<OrdersPageWithProtected />} />
          <Route path="/profile/orders/:id" element={<OrderPageWithProtected />} />
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
