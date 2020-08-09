import * as types from '../types'
import API from '../../api'
import Router from 'next/router'
import { toast } from 'react-toastify'

export const AddProject = (project) => async (dispatch) => {
  // const fd = new FormData()
  // fd.append('cover_image', project.cover_image)
  // fd.append('name', project.name)
  // fd.append('plans', project.plans)
  // fd.append('area', project.area)
  // fd.append('floors_number', project.floors_number)
  // fd.append('flats_per_floor', project.flats_per_floor)
  // fd.append('uploaded_images', project.uploaded_images)
  // fd.append('cover_image', project.cover_image)
  // console.log(fd)

  const acc = await API.post('projects/', project, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(() => {
      toast.success('Your project is added successfully')
      Router.push('/projects')
      dispatch({
        type: types.ADD_PROJECT,
        payload: project,
      })
    })
    .catch((ex) => {
      toast.error('Something is error')
      console.log(ex.response)
    })
}
