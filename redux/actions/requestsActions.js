import * as types from '../types'
import API from '../../api'
import { toast } from 'react-toastify'

export const GetRequests = (offset, limit) => async (dispatch) => {
  const acc = await API.get(`followers/requests/?limit=${offset}&offset=${offset * limit}`)
    .then((res) => {
      dispatch({
        type: types.GET_REQs,
        payload: res.data,
      })
    })
    .catch((ex) => {
      if (ex.response.data.details) toast.error(ex.response.data.details[0])
    })
}
export const GetPendingList = (offset, limit) => async (dispatch) => {
  const acc = await API.get(`followers/sent_requests/?limit=${offset}&offset=${offset * limit}`)
    .then((res) => {
      dispatch({
        type: types.GET_PENDING,
        payload: res.data,
      })
    })
    .catch((ex) => {
      if (ex.response.data.details) toast.error(ex.response.data.details[0])
    })
}

export const SendRequest = (user_id) => async (dispatch) => {
  const acc = await API.post('followers/', { user_id })
    .then(() => {
      dispatch({
        type: types.SEND_REQ,
        payload: user_id,
      })
    })
    .catch((ex) => {
      if (ex.response.data.details) toast.error(ex.response.data.details[0])
    })
}

export const AcceptRequest = (user_id) => async (dispatch) => {
  console.log(user_id)
  const acc = await API.post('followers/friend_requests/accept/', { user_id })
    .then((res) => {
      dispatch({
        type: types.ACCEPT_REQ,
        payload: user_id,
      })
    })
    .catch((ex) => {
      toast.error('something is error')
      console.log(ex)
    })
}

export const RejectRequest = (user_id) => async (dispatch) => {
  console.log(user_id)
  const acc = await API.post('followers/friend_requests/cancel/', { user_id })
    .then(() => {
      dispatch({
        type: types.HANDLE_REQ,
        payload: user_id,
      })
    })
    .catch((ex) => {
      toast.error('something is error')
      console.log(ex.response)
    })
}

export const DeleteFriend = (id) => async (dispatch) => {
  console.log(id)
  const acc = await API.delete(`followers/${id}`)
    .then(() => {
      dispatch({
        type: types.DELETE_REQ,
        payload: id,
      })
    })
    .catch((ex) => {
      toast.error('something is error')
      console.log(ex.response)
    })
}
