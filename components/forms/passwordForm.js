import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from './formInput'

export default function PasswordForm({ profile }) {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: 'onBlur',
  })
  const new_password = useRef({})
  new_password.current = watch('new_password', '')

  const onSubmit = (data) => {
    const token = localStorage.getItem('accessToken')
    const result = { new_password: data.new_password, uid: profile.id, token: token }
    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-7/12 px-10">
        <FormInput
          register={register}
          errors={errors}
          label="new_password"
          labelTxt="New Password"
          errorMsg="Password is required"
          type="password"
        />

        <FormInput
          register={register}
          errors={errors}
          label="confirm_password"
          labelTxt="Confirm New Password"
          errorMsg="Password Confirmation is required"
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
