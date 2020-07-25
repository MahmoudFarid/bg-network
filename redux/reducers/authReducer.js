import * as types from '../types'

const initialState = {
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      return {
        ...state,
        token: action.payload,
      }
    default:
      return state
  }
}
