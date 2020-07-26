import { useRouter } from 'next/router'
import Header from '../core/header'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import Loading from '../core/loading'

export default function MainLayout({ children }) {
  const router = useRouter()
  router.pathname === '/' ? (router.asPath = '/auth/login') : router.pathname
  const isAuth = router.asPath.indexOf('auth') > -1
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <div>
      {!isAuth && <Header />}
      {loading && <Loading />}
      <main className={loading ? 'hidden' : 'block'}>{children}</main>
    </div>
  )
}
