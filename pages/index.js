import Link from 'next/link'
import LoginForm from '../components/forms/loginForm'

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-white px-8 pt-20 z-10">
          <img src="/assets/logo.svg" alt="logo" className="w-1/3" />
          <h1 className="mt-10 mb-6 text-3xl font-extrabold">Login</h1>
          <p className="prg mb-12 font-semibold">
            We will help you with the only dedicated online software designed exclusively to meet
            the needs of real estate professionals.
          </p>
          <LoginForm />
        </div>
        <div className="absolute top-0 h-screen md:relative xl:col-span-2">
          <Link href="auth/signup">
            <a className="absolute right-0 inline-block mt-6 mr-20 py-4 w-4/12 rounded-full bg-primary text-white text-center z-10 focus:outline-none xl:w-2/12">
              Signup
            </a>
          </Link>
          <img
            src="/assets/login-bg.jpg"
            alt="login"
            className="w-full h-full opacity-25 md:opacity-100 "
          />
        </div>
      </div>
      <style jsx>{`
        .prg {
          width: 88%;
        }
      `}</style>
    </div>
  )
}
