export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const clearTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const setNotForbidden = () => localStorage.setItem('not-forbidden', 'true')
export const clearNotForbidden = () => localStorage.removeItem('not-forbidden')
export const getNotForbidden = () => localStorage.getItem('not-forbidden')

export const getAccessToken = () => localStorage.getItem('accessToken')
export const getRefreshToken = () => localStorage.getItem('refreshToken')

export const withAuth = (options: RequestInit = {}) => {
  const token = getAccessToken() || ''
  if(token === '') throw new Error('Token is empty')
  return {
    headers: {
      Authorization: token
    },
    ...options
  }
}
