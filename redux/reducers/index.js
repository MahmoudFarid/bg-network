import { combineReducers } from 'redux'
import authReducer from './authReducer'
import requestsReducer from './requestsReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  requests: requestsReducer,
})

export default rootReducer
