import '@fortawesome/fontawesome-free/css/all.css'
import '../public/styles/tailwind.css'
import '../public/styles/globalStyles.css'
import MainLayout from '../components/layout/mainLayout'

export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
