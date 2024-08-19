import React from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = () => {
  return (
    <form>
      <Input
        onPointerEnterCapture
        onPointerLeaveCapture
        type={'text'}
        placeholder={'Имя'}
        onChange={() => {}}
        value={''}
        name={'name'}
        extraClass="mb-6"
      />
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
        Зарегистрироваться
      </Button>
    </form>
  )
}
