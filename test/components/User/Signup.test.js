import { mount, shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Signup from '../../../src/components/User/Signup'

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(Vuetify)

describe('Signup.vue', () => {
  let wrapper, store, getters, actions

  beforeAll(() => {
    getters = {
      user: jest.fn(),
      error: jest.fn(),
      loading: jest.fn()
    }
    actions = {
      signUserUp: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      getters,
      actions
    })
  })

  beforeEach(() => {
    wrapper = shallow(Signup, {
      store,
      localVue,
      router,
      data: {
        email: 'a@bcd.efg',
        password: 'password',
        confirmPassword: 'password'
      }
    })
  })

  test('Vue Instanse', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Component has the form', () => {
    const form = wrapper.find('form')
    expect(form.is('form')).toBe(true)
  })

  test('onSignup to be called', () => {
    const onSignup = jest.spyOn(wrapper.vm, 'onSignup')

    const form = wrapper.find('form')
    form.trigger('submit')

    wrapper.vm.$nextTick(() => {
      expect(onSignup.mock.calls).toHaveLength(1)
    })
  })
})
