import * as types from '../types'

const initialState = {
  data: null,
  plan: null,
  id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PLANS:
      return {
        ...state,
        data: action.payload,
      }
    case types.ADD_PLAN:
      return {
        ...state,
        plan: action.payload,
      }
    case types.PATCH_PLAN:
      return {
        ...state,
        plan: action.payload,
      }
    case types.DELETE_PLAN:
      return {
        ...state,
        data: state.data.filter((d) => d.id !== action.payload),
      }
    default:
      return state
  }
}
