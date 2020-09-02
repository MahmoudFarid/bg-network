import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { ResetPassword } from './../../redux/actions/authActions'
import FormInput from '../../components/forms/formInput'

export default function forgetPassword() {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  const [isClick, setIsClick] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    setIsClick(true)
    dispatch(ResetPassword(data))
  }

  return (
    <div>
      <Head>
        <title>Forget Password</title>
      </Head>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-3">
        <div className="px-8 pt-20 z-10 md:bg-white">
          <img src="/assets/logo.svg" alt="logo" className="w-1/3" />
          {isClick ? (
            <div>
              <h1 className="mt-10 mb-6 text-3xl font-extrabold">Check your email</h1>
              <p className="text-lg w-10/12 mb-6">
                We've sent an email to me******@g****.***. <br /> Click the link in the email to
                reset your password.
              </p>
              <p className="text-lg w-10/12">
                If you don't see the email, check other places it might be, like your junk, spam,
                social, or other folders.
              </p>
            </div>
          ) : (
            <div>
              <h1 className="mt-10 mb-6 text-3xl font-extrabold">Forget Your Password</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  register={register}
                  errors={errors}
                  label="email"
                  labelTxt="Email"
                  errorMsg="Email is required"
                  type="text"
                  placeholder="Enter your Email"
                />
                <button
                  className="py-3 px-4 rounded-full w-full mt-8 focus:outline-none bg-primary text-white"
                  type="submit">
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="absolute top-0 h-screen md:relative xl:col-span-2">
          <Link href="signup">
            <a className="absolute right-0 inline-block mt-6 mr-20 py-4 w-4/12 rounded-full bg-primary text-white text-center z-10 focus:outline-none xl:w-2/12">
              Signup
            </a>
          </Link>
          <img
            src="/assets/auth-bg.jpg"
            alt="auth"
            className="w-full h-full opacity-25 md:opacity-100 "
          />
        </div>
      </div>
    </div>
  )
}
