import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import DateFilter from '../../../src/filters/date'
import Courses from '../../../src/components/Course/Courses'
import { __createMocks } from '../../store'

// jest.mock('../../store')

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.filter('date', DateFilter)

describe('Courses.Vuex', () => {
  let courseMocks
  let wrapper

  beforeEach(() => {
    courseMocks = __createMocks()

    wrapper = shallow(Courses, {
      store: courseMocks.store,
      localVue,
      router
    })
  })

  test('It should return courses', () => {
    expect(courseMocks.getters.loadedCourses).toHaveBeenCalled()
  })
})
