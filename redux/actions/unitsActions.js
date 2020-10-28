import * as types from '../types'
import API from '../../api'
import Router from 'next/router'
import { toast } from 'react-toastify'

export const AddUnit = (pid, formData, config, isSetup) => async (dispatch) => {
  const acc = await API.post(`projects/${pid}/units/`, formData, config)
    .then(() => {
      toast.success('Your unit is added successfully')
      isSetup
        ? Router.push('/dashboard')
        : Router.push('/projects/[pid]/units', `/projects/${pid}/units`)
      dispatch({
        type: types.ADD_UNIT,
        payload: formData,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
    })
}

export const EditUnit = (pid, uid, formData, config) => async (dispatch) => {
  const acc = await API.patch(`projects/${pid}/units/${uid}/`, formData, config)
    .then(() => {
      toast.success('Your unit is updated successfully')
      Router.push('/projects/[pid]/units/[uid]', `/projects/${pid}/units/${uid}`)
      dispatch({
        type: types.PATCH_UNIT,
        payload: formData,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
    })
}

export const DeleteUnit = (pid, uid) => async (dispatch) => {
  const acc = await API.delete(`projects/${pid}/units/${uid}/`).then(() => {
    toast.success('Your unit is deleted successfully')
    Router.push('/projects/[pid]/units', `/projects/${pid}/units`)
    dispatch({
      type: types.DELETE_UNIT,
      payload: id,
    })
  })
}
