import { getters } from '../store'

export default (to, from, next) => {
  if (getters.user) {
    next()
  } else {
    next('/signin')
  }
}
