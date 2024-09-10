import React, { useState } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { errorLabelEmpty } from '@/utils/helper'
import AuthApi from '@/api/AuthApi'
import { useNotification } from '@/providers/notification-provider'
import { setNotForbidden } from '@/utils/local-storage-helper'
import { useNavigate } from 'react-router-dom'

interface ForgotFormProps {}

export const ForgotForm: React.FC<ForgotFormProps> = () => {
  const [email, setEmail] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return setEmail('')
    setLoading(true)
    new AuthApi()
      .preResetPassword({ email })
      .then(() => {
        notify('success', 'Запрос на смену пароля успешно выполнен!')
        setNotForbidden()
        navigate('/reset-password')
      })
      .catch((err) => {
        notify('error', err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Укажите e-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email || ''}
        name="email"
        error={email === ''}
        errorText={errorLabelEmpty('email')}
        extraClass="mb-6"
        autoComplete="off"
      />
      <Button htmlType="submit" type="primary" disabled={loading}>
        {loading ? 'Ожидайте...' : 'Восстановить'}
      </Button>
    </form>
  )
}
