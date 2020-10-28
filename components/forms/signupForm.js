import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Signup } from '../../redux/actions/authActions'
import FormInput from './formInput'

export default function SignUpForm({ isDeveloper }) {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: 'onBlur',
  })
  const password = useRef({})
  password.current = watch('password', '')
  const dispatch = useDispatch()

  const preventShowLetter = (e) => {
    const char = String.fromCharCode(e.which)
    if (e.which != 8 && !/[0-9]/.test(char)) {
      e.preventDefault()
    }
  }

  const onSubmit = (data) => {
    dispatch(Signup(data, isDeveloper))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register}
        errors={errors}
        label="name"
        labelTxt="Name*"
        type="text"
        placeholder="Enter your Name"
      />

      <FormInput
        register={register}
        errors={errors}
        label="phone"
        labelTxt="Phone*"
        type="text"
        placeholder="Enter your Phone"
        onKeyPress={preventShowLetter}
      />

      <FormInput
        register={register}
        errors={errors}
        label="email"
        labelTxt="Email*"
        type="text"
        placeholder="Enter your Email"
      />

      <FormInput
        register={register}
        errors={errors}
        label="password"
        labelTxt="Password*"
        type="password"
        placeholder="Enter your Password"
      />

      <FormInput
        register={register}
        errors={errors}
        label="confirm_password"
        labelTxt="Password Confirmation*"
        type="password"
        placeholder="Repeat your Password"
        currentPass={password.current}
      />

      <button
        className="py-3 px-4 rounded-full w-full mt-8 focus:outline-none bg-primary text-white"
        type="submit">
        Sign up
      </button>

      <p className="text-center w-7/12 font-semibold my-10 mx-auto">
        By signing up you accept our Terms of Use and Privacy Policy
      </p>
    </form>
  )
}
