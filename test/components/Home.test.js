import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Home from '../../src/components/Home'

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(Vuetify)

describe('Home.vue', () => {
  let wrapper, store, getters

  beforeAll(() => {
    getters = {
      featuredCourses: jest.fn(),
      loading: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      getters
    })
  })

  beforeEach(() => {
    wrapper = shallow(Home, {
      store,
      localVue,
      router,
      computed: {
        courses: () => ['Course 1', 'Course 2']
      }
    })
  })

  test('Vue Instanse', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Courses is loaded', () => {
    expect(wrapper.vm.courses[0]).toEqual('Course 1')
    expect(wrapper.vm.courses).toHaveLength(2)
  })
})
