import React, { useEffect } from 'react'
import { useSelector } from '@/services/store'
import { Navigate, useLocation } from 'react-router-dom'
import { useNotification } from '@/providers/notification-provider'
import { Loading } from '@/components'

interface WithProtectionProps {
  limitedAccess?: boolean
}

const withProtection = (Component: React.ComponentType) => {
  return ({ limitedAccess = false }: WithProtectionProps) => {
    const { notify } = useNotification()
    const { user, error, loading } = useSelector((state) => state.auth)
    const location = useLocation()

    useEffect(() => {
      if (error) notify('error', error)
    }, [error, notify])

    if (loading) return <Loading />

    if (limitedAccess) {
      return user ? <Navigate to={location.state?.redirectTo || '/'} /> : <Component />
    } else {
      return !user ? <Navigate to="/login" state={{ redirectTo: location.pathname }} /> : <Component />
    }
  }
}

export default withProtection
