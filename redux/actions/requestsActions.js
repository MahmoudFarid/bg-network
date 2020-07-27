import * as types from '../types'
import API from '../../api'
import { toast } from 'react-toastify'

export const GetRequests = () => async (dispatch) => {
  const acc = await API.get('followers/requests')
    .then((res) => {
      dispatch({
        type: types.GET_REQs,
        payload: res.data.results,
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

export const AcceptRequest = (id) => async (dispatch) => {
  const acc = await API.post(`followers/friend_requests/${id}/accept/`)
    .then(() => {
      dispatch({
        type: types.HANDLE_REQ,
        payload: id,
      })
    })
    .catch((ex) => {
      console.log(ex)
    })
}

export const RejectRequest = (id) => async (dispatch) => {
  const acc = await API.post(`followers/friend_requests/${id}/reject/`)
    .then(() => {
      dispatch({
        type: types.HANDLE_REQ,
        payload: id,
      })
    })
    .catch((ex) => {
      console.log(ex)
    })
}
