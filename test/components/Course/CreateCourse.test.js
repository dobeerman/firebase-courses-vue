import { mount, shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment'
import { __createMocks } from '../../store'

import CreateCourse from '../../../src/components/Course/CreateCourse'

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueMoment)

describe('CreateCourse.vue', () => {
  let courseMocks
  let wrapper

  beforeEach(() => {
    courseMocks = __createMocks()

    wrapper = mount(CreateCourse, {
      store: courseMocks.store,
      localVue,
      router
    })
  })

  test('Vue Instanse', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Component has the form', () => {
    const form = wrapper.find('form')
    expect(form.is('form')).toBe(true)
  })

  test('Form is not valid on the initial state', () => {
    expect(wrapper.vm.formIsValid).toBeFalsy()
  })

  test('Submit the form', () => {
    const onCreateCourse = jest.spyOn(wrapper.vm, 'onCreateCourse')
    wrapper.find('form').trigger('submit')
    wrapper.vm.$nextTick(() => {
      expect(onCreateCourse).toHaveBeenCalled()
    })
  })
})
