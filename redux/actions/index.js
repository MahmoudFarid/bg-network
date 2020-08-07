import authActions from './authActions'
import plansActions from './plansActions'
import requestsActions from './requestsActions'
import profileActions from './profileActions'

export default {
  ...authActions,
  ...plansActions,
  ...requestsActions,
  ...profileActions,
}
