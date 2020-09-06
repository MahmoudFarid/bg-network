import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Login } from './../../redux/actions/authActions'
import FormInput from './formInput'

export default function LoginForm() {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(Login(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register}
        errors={errors}
        label="email"
        labelTxt="Email"
        type="text"
        placeholder="Enter your Email"
      />

      <FormInput
        register={register}
        errors={errors}
        label="password"
        labelTxt="Password"
        type="password"
        placeholder="*********"
      />

      <button
        className="py-3 px-4 rounded-full w-full mt-8 focus:outline-none bg-primary text-white"
        type="submit">
        Login
      </button>

      <Link href="auth/forgetPassword">
        <a className="inline-block text-primaryLight text-center text-xs font-semibold underline w-full mt-5 hover:text-primaryText focus:outline-none">
          Forget your password?
        </a>
      </Link>
    </form>
  )
}
