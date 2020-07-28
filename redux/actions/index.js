import authActions from './authActions'
import requestsActions from './requestsActions'
import profileActions from './profileActions'

export default {
  ...authActions,
  ...requestsActions,
  ...profileActions,
}
