import React from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  return (
    <form>
      <Input
        onPointerEnterCapture
        onPointerLeaveCapture
        type={'text'}
        placeholder={'E-mail'}
        onChange={() => {}}
        value={''}
        name={'email'}
        extraClass="mb-6"
      />
      <PasswordInput onChange={() => {}} value={''} name={'password'} extraClass="mb-6" />
      <Button htmlType="submit" type="primary">
        Войти
      </Button>
    </form>
  )
}
