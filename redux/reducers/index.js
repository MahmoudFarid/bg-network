import { combineReducers } from 'redux'
import authReducer from './authReducer'
import plansReducer from './plansReducer'
import unitsReducer from './unitsReducer'
import profileReducer from './profileReducer'
import projectsReducer from './projectsReducer'
import requestsReducer from './requestsReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  requests: requestsReducer,
  account: profileReducer,
  plans: plansReducer,
  units: unitsReducer,
  projects: projectsReducer,
})

export default rootReducer
