import authActions from './authActions'
import plansActions from './plansActions'
import unitsActions from './unitsActions'
import requestsActions from './requestsActions'
import profileActions from './profileActions'

export default {
  ...authActions,
  ...plansActions,
  ...unitsActions,
  ...requestsActions,
  ...profileActions,
}
