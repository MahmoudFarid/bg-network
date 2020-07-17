import Link from 'next/link'
import { useForm } from 'react-hook-form'
import FormInput from './formInput'

export default function LoginForm() {
  const { register, errors, handleSubmit, formState } = useForm({
    mode: 'onBlur',
  })
  const { isValid } = formState

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="*********"
      />

      <button
        className={`py-3 px-4 rounded-full w-full mt-8 focus:outline-none ${
          isValid ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        type="submit"
        disabled={!isValid}>
        Login
      </button>

      <Link href="/forgetPassword">
        <a className="inline-block text-secondary text-center text-xs font-semibold underline w-full mt-5 hover:text-primaryText focus:outline-none">
          Forget your password?
        </a>
      </Link>
    </form>
  )
}
