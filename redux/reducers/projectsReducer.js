import * as types from '../types'

const initialState = {
  project: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PROJECT:
      return {
        ...state,
        project: action.payload,
      }
    default:
      return state
  }
}
