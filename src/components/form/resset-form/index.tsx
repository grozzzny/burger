import React, { useState } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNotification } from '@/providers/notification-provider'
import { useNavigate } from 'react-router-dom'
import AuthApi from '@/api/AuthApi'
import { clearNotForbidden } from '@/utils/local-storage-helper'
import { errorLabelEmpty } from '@/utils/helper'
import { TInputInterface } from '@/types'

interface ResetFormProps {}

export const ResetForm: React.FC<ResetFormProps> = () => {
  const [password, setPassword] = useState('')
  const [code, setCode] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return notify('error', errorLabelEmpty('password'))
    if (!code) return setCode('')
    setLoading(true)
    new AuthApi()
      .resetPassword({ password, token: code })
      .then(() => {
        notify('success', 'Пароль успешно изменен!')
        clearNotForbidden()
        navigate('/login')
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
      <PasswordInput
        placeholder={'Введите новый пароль'}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mb-6"
      />
      <Input
        {...({
          type: 'text',
          placeholder: 'Введите код из письма',
          onChange: (e) => setCode(e.target.value),
          value: code || '',
          name: 'code',
          error: code === '',
          errorText: errorLabelEmpty('code'),
          extraClass: 'mb-6',
          autoComplete: 'off'
        } as TInputInterface)}
      />
      <Button htmlType="submit" type="primary" disabled={loading}>
        {loading ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  )
}
