import * as types from '../types'

const initialState = {
  unit: null,
  id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_UNIT:
      return {
        ...state,
        unit: action.payload,
      }
    case types.PATCH_UNIT:
      return {
        ...state,
        unit: action.payload,
      }
    case types.DELETE_UNIT:
      return {
        ...state,
        id: action.payload,
      }
    default:
      return state
  }
}
