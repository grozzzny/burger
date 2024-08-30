import React, { useState, useEffect } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNotification } from '@/providers/notification-provider'
import { useDispatch, useSelector } from '@/services/store'
import { updateUser } from '@/services/auth/actions'
import { TInputInterface } from '@/types'
import { errorLabelEmpty } from '@/utils/helper'
import AuthApi from '@/api/AuthApi'

interface ProfileFormProps {}

export const ProfileForm: React.FC<ProfileFormProps> = () => {
  const dispatch = useDispatch()
  const { notify } = useNotification()
  const { user, error, loading } = useSelector((state) => state.auth)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (error) notify('error', error)
  }, [error, notify])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateUser({ name, email }))
      .unwrap()
      .then(() => {
        notify('success', 'Профиль обновлён успешно!')
      })
      .catch()
  }

  const handleCancel = async () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
  }

  const handlePassword = async () => {
    const authApi = new AuthApi()
    authApi
      .preResetPassword({ email })
      .then(() => {
        notify('success', 'На ваш электронный адрес был отправлен код подтверждения!')
        const code = prompt('Код из письма')
        authApi
          .resetPassword({ password, token: code || '' })
          .then(() => {
            notify('success', 'Пароль успешно изменен!')
            setPassword('')
          })
          .catch((err) => {
            notify('error', err.message)
          })
      })
      .catch((err) => {
        notify('error', err.message)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...({
          type: 'text',
          placeholder: 'Имя',
          onChange: (e) => setName(e.target.value),
          value: name,
          name: 'name',
          error: name === '',
          errorText: errorLabelEmpty('name'),
          icon: 'EditIcon',
          extraClass: 'mb-6',
          autoComplete: 'off'
        } as TInputInterface)}
      />
      <Input
        {...({
          type: 'text',
          placeholder: 'E-mail',
          onChange: (e) => setEmail(e.target.value),
          value: email,
          name: 'email',
          error: email === '',
          errorText: errorLabelEmpty('email'),
          icon: 'EditIcon',
          extraClass: 'mb-6',
          autoComplete: 'off'
        } as TInputInterface)}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mb-6"
      />
      {(email != user?.email || name != user?.name) && (
        <>
          <Button onClick={handleCancel} htmlType="button" type="secondary">
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </>
      )}
      {password != '' && (
        <>
          <Button onClick={handlePassword} htmlType="button" type="primary">
            Сменить пароль
          </Button>
        </>
      )}
    </form>
  )
}
