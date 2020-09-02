import * as types from '../types'
import API from '../../api'
import Router from 'next/router'
import { toast } from 'react-toastify'

export const GetPlans = (offset, limit) => async (dispatch) => {
  const acc = await API.get(`plans/?limit=${offset}&offset=${offset * limit}`)
    .then((res) => {
      dispatch({
        type: types.GET_PLANS,
        payload: res.data,
      })
    })
    .catch((ex) => {
      if (ex.response.data.details) toast.error(ex.response.data.details[0])
    })
}

export const AddPlan = (plan) => async (dispatch) => {
  const acc = await API.post('plans/', plan)
    .then(() => {
      toast.success('Your plan is added successfully')
      Router.push('/plans')
      dispatch({
        type: types.ADD_PLAN,
        payload: plan,
      })
    })
    .catch((ex) => {
      if (ex.response.data.installments) toast.info(ex.response.data.installments[0])
      else toast.error('Something is error')
    })
}

export const PatchPlan = (id, plan) => async (dispatch) => {
  const acc = await API.patch(`plans/${id}/`, plan)
    .then(() => {
      toast.success('Your plan is changed successfully')
      Router.push('/plans')
      dispatch({
        type: types.PATCH_PLAN,
        payload: plan,
      })
    })
    .catch((ex) => {
      if (ex.response.data.installments) toast.info(ex.response.data.installments[0])
      else toast.error('Something is error')
      console.log(ex.response)
    })
}

export const DeletePlan = (id) => async (dispatch) => {
  const acc = await API.delete(`plans/${id}/`)
    .then(() => {
      toast.success('Your plan is deleted successfully')
      Router.push('/plans')
      dispatch({
        type: types.DELETE_PLAN,
        payload: id,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
      console.log(ex.response)
    })
}
