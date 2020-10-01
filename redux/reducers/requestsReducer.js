import * as types from '../types'

const initialState = {
  data: null,
  pending: null,
  id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REQs:
      return {
        ...state,
        data: action.payload.results,
      }
    case types.GET_PENDING:
      return {
        ...state,
        pending: action.payload.results,
      }
    case types.SEND_REQ:
      return {
        ...state,
        id: action.payload,
      }
    case types.ACCEPT_REQ:
      return {
        ...state,
        data: state.data.filter((data) => data.from_user.id !== action.payload),
      }
    case types.HANDLE_REQ:
      return {
        ...state,
        data: state.data.filter((data) => data.from_user.id !== action.payload),
      }
    default:
      return state
  }
}
