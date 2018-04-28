import { mount, shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Signin from '../../../src/components/User/Signin'

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(Vuetify)

describe('Signin.vue', () => {
  let wrapper, store, getters, actions

  beforeAll(() => {
    getters = {
      user: jest.fn(),
      error: jest.fn(),
      loading: jest.fn()
    }
    actions = {
      signUserIn: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      getters,
      actions
    })
  })

  beforeEach(() => {
    wrapper = mount(Signin, {
      store,
      localVue,
      router,
      data: { email: 'a@bcd.efg', password: 'password' }
    })
  })

  test('Vue Instanse', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Component has the form', () => {
    const form = wrapper.find('form')
    expect(form.is('form')).toBe(true)
  })

  test('onSignin to be called', () => {
    const onSignin = jest.spyOn(wrapper.vm, 'onSignin')

    const form = wrapper.find('form')
    form.trigger('submit')

    wrapper.vm.$nextTick(() => {
      expect(onSignin).toHaveBeenCalled()
    })
  })
})
