import React, { useState, useEffect } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNotification } from '@/providers/notification-provider'
import { useDispatch, useSelector } from '@/services/store'
import { register } from '@/services/auth/actions'
import { errorLabelEmpty } from '@/utils/helper'
import { useNavigate } from 'react-router-dom'

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = () => {
  const dispatch = useDispatch()
  const notification = useNotification()
  const navigate = useNavigate()

  const error = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (error) notification?.notify('error', error)
  }, [error, notification])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        notification?.notify('success', 'Регистрация прошла успешно!')
        navigate('/')
      })
      .catch((err) => console.error(err))
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Input
        type="text"
        placeholder="Имя"
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="name"
        error={name === ''}
        errorText={errorLabelEmpty('name')}
        extraClass="mb-6"
        autoComplete="off"
      />
      <Input
        type="text"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        error={email === ''}
        errorText={errorLabelEmpty('email')}
        extraClass="mb-6"
        autoComplete="off"
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mb-6"
        autoComplete="off"
      />
      <Button htmlType="submit" type="primary" disabled={loading}>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
    </form>
  )
}
