import * as types from '../types'
import API from '../../api'
import Router from 'next/router'
import { toast } from 'react-toastify'

export const PatchProfile = (profile) => async (dispatch) => {
  const acc = await API.patch('users/me/', profile)
    .then(() => {
      toast.success('Your data is changed successfully')
      Router.push('/profile')
      dispatch({
        type: types.PATCH_PROFILE,
        payload: profile,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
    })
}

export const changePassword = (password) => async (dispatch) => {
  const acc = await API.post('auth/password/', password)
    .then(() => {
      toast.success('Your password is changed successfully')
      Router.push('/profile')
      dispatch({
        type: types.CHANGE_PASS,
        payload: password,
      })
    })
    .catch((ex) => {
      console.log(ex.response.data)
      if (ex.response.data.current_password) toast.info('Current password is not correct')
      if (ex.response.data.new_password) toast.info(ex.response.data.new_password[0])
    })
}
