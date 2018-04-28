import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import App from '../src/App'

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(Vuetify)

describe('App.vue', () => {
  let store
  let getters
  let actions

  beforeAll(() => {
    getters = {
      user: jest.fn()
    }
    actions: {
      logout: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      getters
    })
  })

  test('Vue Instanse', () => {
    const wrapper = shallow(App, { store, localVue, router })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('User not logged in', () => {
    const wrapper = shallow(App, { store, localVue, router })
    expect(wrapper.vm.userIsAuthenticated).toBeFalsy()
  })

  test('User logged in', () => {
    const wrapper = shallow(App, {
      store,
      localVue,
      router,
      computed: {
        userIsAuthenticated: () => true
      }
    })
    expect(wrapper.vm.userIsAuthenticated).toBeTruthy()
  })
})
