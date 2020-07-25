import * as types from '../types'

const initialState = {
  login: null,
  account: null,
  resetEmail: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      return {
        ...state,
        login: action.payload,
      }
    case types.SIGNUP:
      return {
        ...state,
        account: action.payload,
      }
    case types.RESET_PASS:
      return {
        ...state,
        resetEmail: action.payload,
      }
    default:
      return state
  }
}
