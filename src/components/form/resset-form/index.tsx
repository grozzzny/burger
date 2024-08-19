import React from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

interface ResetFormProps {}

export const ResetForm: React.FC<ResetFormProps> = () => {
  return (
    <form>
      <PasswordInput
        placeholder={'Введите новый пароль'}
        onChange={() => {}}
        value={''}
        name={'password'}
        extraClass="mb-6"
      />
      <Input
        onPointerEnterCapture
        onPointerLeaveCapture
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={() => {}}
        value={''}
        name={'code'}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary">
        Сохранить
      </Button>
    </form>
  )
}
