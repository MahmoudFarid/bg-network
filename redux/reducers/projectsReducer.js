import * as types from '../types'

const initialState = {
  project: null,
  id: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PROJECT:
      return {
        ...state,
        project: action.payload,
      }
    case types.DELETE_PROJECT:
      return {
        ...state,
        id: action.payload,
      }
    default:
      return state
  }
}
