import * as types from '../types'
import API from '../../api'
import Router from 'next/router'
import { toast } from 'react-toastify'

export const AddProject = (formData, config) => async (dispatch) => {
  const acc = await API.post('projects/', formData, config)
    .then(() => {
      toast.success('Your project is added successfully')
      Router.push('/projects')
      dispatch({
        type: types.ADD_PROJECT,
        payload: formData,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
      console.log(ex.response)
    })
}

export const DeleteProject = (id) => async (dispatch) => {
  const acc = await API.delete(`projects/${id}/`)
    .then(() => {
      toast.success('Your project is deleted successfully')
      Router.push('/projects')
      dispatch({
        type: types.DELETE_PROJECT,
        payload: id,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
      console.log(ex.response)
    })
}

export const EditProject = (id, formData, config) => async (dispatch) => {
  const acc = await API.patch(`projects/${id}/`, formData, config)
    .then(() => {
      toast.success('Your project is updated successfully')
      Router.push(`/projects/${id}`)
      dispatch({
        type: types.PATCH_PROJECT,
        payload: formData,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
      console.log(ex.response)
    })
}
