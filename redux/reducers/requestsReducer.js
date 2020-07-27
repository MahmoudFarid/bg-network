import * as types from '../types'

const initialState = {
  data: null,
  id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REQs:
      return {
        ...state,
        data: action.payload,
      }
    case types.SEND_REQ:
      return {
        ...state,
        id: action.payload,
      }
    case types.HANDLE_REQ:
      return state.data.filter((data) => data.id !== action.payload)
    default:
      return state
  }
}
