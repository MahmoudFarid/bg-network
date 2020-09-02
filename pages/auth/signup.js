import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import SignUpForm from '../../components/forms/signupForm'

export default function SignUp() {
  const [isDeveloper, setIsDeveloper] = useState(true)

  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="px-8 pt-20 z-10 md:bg-white">
          <img src="/assets/logo.svg" alt="logo" className="w-1/3" />
          <h1 className="mt-3 mb-10 text-3xl font-extrabold">Create your account</h1>
          <div className="flex justify-start mb-10">
            <div className="w-5/12 mr-3 cursor-pointer" onClick={() => setIsDeveloper(true)}>
              {isDeveloper ? (
                <img src="/assets/developer-active.png" alt="developer-active" className="w-full" />
              ) : (
                <img
                  src="/assets/developer-inactive.png"
                  alt="developer-inactive"
                  className="w-full"
                />
              )}
            </div>
            <div className="w-5/12 cursor-pointer" onClick={() => setIsDeveloper(false)}>
              {isDeveloper ? (
                <img src="/assets/broker-inactive.png" alt="broker-inactive" className="w-full" />
              ) : (
                <img src="/assets/broker-active.png" alt="broker-active" className="w-full" />
              )}
            </div>
          </div>
          <SignUpForm isDeveloper={isDeveloper} />
        </div>
        <div className="absolute top-0 min-h-screen md:relative xl:col-span-2">
          <Link href="/">
            <a className="absolute right-0 inline-block mt-6 mr-20 py-4 w-4/12 rounded-full bg-primary text-white text-center z-10 focus:outline-none xl:w-2/12">
              Login
            </a>
          </Link>
          <img
            src="/assets/signup-bg.jpg"
            alt="signup"
            className="w-full min-h-screen opacity-25 md:opacity-100 "
          />
        </div>
      </div>
    </div>
  )
}
