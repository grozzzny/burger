import React from 'react'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

interface ProfileFormProps {}

export const ProfileForm: React.FC<ProfileFormProps> = () => {
  return (
    <form>
      <Input
        onPointerEnterCapture
        onPointerLeaveCapture
        type={'text'}
        placeholder={'Имя'}
        onChange={() => {}}
        value={'Марк'}
        name={'name'}
        extraClass="mb-6"
        icon='EditIcon'
      />
      <EmailInput
        onChange={() => {}}
        value={'mail@stellar.burgers'}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput onChange={() => {}} value={''} name={'password'} extraClass="mb-6" />
      <Button htmlType="submit" type="primary">
        Сохранить
      </Button>
    </form>
  )
}
