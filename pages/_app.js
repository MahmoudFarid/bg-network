import '@fortawesome/fontawesome-free/css/all.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-dropzone-uploader/dist/styles.css'
import '../public/styles/tailwind.css'
import '../public/styles/globalStyles.css'

import Head from 'next/head'
import store from './../redux/store'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import { ToastContainer } from 'react-toastify'
import MainLayout from '../components/layout/mainLayout'

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer />

      <MainLayout>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
          />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(App)
