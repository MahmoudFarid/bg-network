import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from './formInput'

export default function SignUpForm() {
  const { register, errors, handleSubmit, formState, watch } = useForm({
    mode: 'onBlur',
  })
  const password = useRef({})
  password.current = watch('password', '')
  const { isValid } = formState

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register}
        errors={errors}
        label="name"
        labelTxt="Name"
        errorMsg="Name is required"
        type="text"
        placeholder="Enter your Name"
      />

      <FormInput
        register={register}
        errors={errors}
        label="email"
        labelTxt="Email"
        errorMsg="Email is required"
        type="email"
        placeholder="Enter your Email"
      />

      <FormInput
        register={register}
        errors={errors}
        label="password"
        labelTxt="Password"
        errorMsg="Password is required"
        type="password"
        placeholder="Enter your Password"
      />

      <FormInput
        register={register}
        errors={errors}
        label="passwordConf"
        labelTxt="Password Confirmation"
        errorMsg="Password Confirmation is required"
        type="password"
        placeholder="Repeat your Password"
        currentPass={password.current}
      />

      <button
        className={`py-3 px-4 rounded-full w-full mt-8 focus:outline-none ${
          isValid ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        type="submit"
        disabled={!isValid}>
        Sign up
      </button>

      <p className="text-center w-7/12 font-semibold my-10 mx-auto">
        By signing up you accept our Terms of Use and Privacy Policy
      </p>
    </form>
  )
}
