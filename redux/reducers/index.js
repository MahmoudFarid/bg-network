import { combineReducers } from 'redux'
import authReducer from './authReducer'
import requestsReducer from './requestsReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  requests: requestsReducer,
  account: profileReducer,
})

export default rootReducer
