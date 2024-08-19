import React from 'react'

interface WithProtectionProps {
  isAuthenticated: boolean
}

const withProtection = (Component: React.ComponentType) => {
  return ({ isAuthenticated }: WithProtectionProps) => {
    if (!isAuthenticated) {
      // return <Navigate to="/login" replace />
    }

    return <Component />
  }
}

export default withProtection
