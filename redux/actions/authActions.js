import * as types from '../types'
import API from '../../api'
import { toast } from 'react-toastify'
import Router from 'next/router'

export const Login = (account) => async (dispatch) => {
  const acc = await API.post('auth/token/login/', account)
    .then((res) => {
      toast.success('You logged in successfully')
      Router.push('/dashboard')
      localStorage.setItem('accessToken', res.data.auth_token)
      localStorage.setItem('isBroker', res.data.is_broker)

      dispatch({
        type: types.AUTHENTICATE,
        payload: { token: res.data.auth_token, isBroker: res.data.is_broker },
      })
    })
    .catch((ex) => {
      if (ex.response && ex.response.status >= 400) toast.error('Email or Password is incorrect')
    })
}

export const Signup = (account, isDeveloper) => async (dispatch) => {
  let type
  isDeveloper ? (type = 'reds/') : (type = 'brokers/')
  const acc = await API.post(type, account)
    .then((res) => {
      dispatch({
        type: types.SIGNUP,
        payload: account,
      })
      dispatch(
        Login({
          email: account.email,
          password: account.password,
        })
      )
    })
    .catch((ex) => {
      if (ex.response.data.email) toast.error(ex.response.data.email[0])
      else if (ex.response.data.password) toast.error(ex.response.data.password[0])
      else toast.error('Something is error')
    })
}

export const ResetPassword = (email) => async (dispatch) => {
  const acc = await API.post('auth/password/reset/', email)
    .then(() => {
      dispatch({
        type: types.RESET_PASS,
        payload: email,
      })
    })
    .catch((ex) => {
      if (ex.response.data.email) toast.error(ex.response.data.email[0])
      else toast.error('Something is error')
    })
}

export const Logout = () => async (dispatch) => {
  await API.post('auth/token/destroy/')
  Router.push('/')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('isBroker')
}
