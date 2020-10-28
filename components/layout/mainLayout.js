import { useRouter } from 'next/router'
import Header from '../core/header'

export default function MainLayout({ children }) {
  const router = useRouter()
  router.pathname === '/' ? (router.asPath = '/auth/login') : router.pathname
  const isAuth = router.asPath.indexOf('auth') > -1
  const isSetup = router.asPath.indexOf('setup') > -1

  return (
    <div>
      {!isAuth && <Header router={router.pathname} isSetup={isSetup} />}
      <main>{children}</main>
    </div>
  )
}
