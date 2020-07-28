import * as types from '../types'

const initialState = {
  profile: null,
  password: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PATCH_PROFILE:
      return {
        ...state,
        profile: action.payload,
      }
    case types.CHANGE_PASS:
      return {
        ...state,
        password: action.payload,
      }
    default:
      return state
  }
}
