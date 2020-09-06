import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../redux/actions/profileActions'
import FormInput from './formInput'

export default function PasswordForm() {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: 'onBlur',
  })
  const new_password = useRef({})
  new_password.current = watch('new_password', '')
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(changePassword(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-7/12 px-10">
        <FormInput
          register={register}
          errors={errors}
          label="current_password"
          labelTxt="Current Password*"
          type="password"
        />

        <FormInput
          register={register}
          errors={errors}
          label="new_password"
          labelTxt="New Password*"
          type="password"
        />

        <FormInput
          register={register}
          errors={errors}
          label="confirm_password"
          labelTxt="Confirm New Password*"
          type="password"
          currentPass={new_password.current}
        />
      </div>

      <div className="absolute bottom-0 border-t-2 border-gray-200 mb-5 pt-3 w-full">
        <button
          className="float-right bg-primary text-gray-400 text-xs font-semibold rounded-lg py-3 px-12 mr-6 hover:text-white focus:outline-none"
          type="submit">
          Save
        </button>
      </div>
    </form>
  )
}
