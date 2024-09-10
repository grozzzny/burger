import React, { useState, useEffect } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNotification } from '@/providers/notification-provider'
import { useDispatch, useSelector } from '@/services/store'
import { login } from '@/services/auth/actions'

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const dispatch = useDispatch()
  const { notify } = useNotification()

  const error = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (error) notify('error', error)
  }, [error, notify])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        notify('success', 'Вход выполнен успешно!')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        extraClass="mb-6"
        error={!!error}
        errorText={error || undefined}
        autoComplete="off"
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" disabled={loading}>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  )
}
