import * as types from '../types'
import API from '../../api'
import Router from 'next/router'
import { toast } from 'react-toastify'

export const AddUnit = (pid, unit) => async (dispatch) => {
  const acc = await API.post(`projects/${pid}/units/`, unit)
    .then(() => {
      toast.success('Your unit is added successfully')
      Router.push('/projects/[pid]/units', `/projects/${pid}/units`)
      dispatch({
        type: types.ADD_UNIT,
        payload: unit,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
      console.log(ex.response)
    })
}

export const EditUnit = (pid, uid, unit) => async (dispatch) => {
  const acc = await API.patch(`projects/${pid}/units/${uid}/`, unit)
    .then(() => {
      toast.success('Your unit is updated successfully')
      Router.push('/projects/[pid]/units', `/projects/${pid}/units`)
      dispatch({
        type: types.PATCH_UNIT,
        payload: unit,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
      console.log(ex.response)
    })
}

export const DeleteUnit = (pid, uid) => async (dispatch) => {
  const acc = await API.delete(`projects/${pid}/units/${uid}/`)
    .then(() => {
      toast.success('Your unit is deleted successfully')
      Router.push('/projects/[pid]/units', `/projects/${pid}/units`)
      dispatch({
        type: types.DELETE_UNIT,
        payload: id,
      })
    })
    .catch((ex) => {
      console.log(ex.response)
    })
}
