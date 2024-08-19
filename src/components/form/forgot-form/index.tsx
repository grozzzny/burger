import React from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

interface ForgotFormProps {}

export const ForgotForm: React.FC<ForgotFormProps> = () => {
  return (
    <form>
      <Input
        onPointerEnterCapture
        onPointerLeaveCapture
        type={'text'}
        placeholder={'Укажите e-mail'}
        onChange={() => {}}
        value={''}
        name={'email'}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary">
        Восстановить
      </Button>
    </form>
  )
}
