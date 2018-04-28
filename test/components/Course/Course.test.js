import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import DateFilter from '../../../src/filters/date'
import Course from '../../../src/components/Course/Course'
import { __createMocks } from '../../store'

const localVue = createLocalVue()

localVue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/courses/:id', name: 'Course' },
    { path: '/courses/:id/edit', name: 'EditCourse' }
  ]
})

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.filter('date', DateFilter)

describe('Course.vue', () => {
  let courseMocks
  let wrapper

  beforeEach(() => {
    courseMocks = __createMocks()

    wrapper = shallow(Course, {
      store: courseMocks.store,
      localVue,
      router,
      computed: {
        course: jest.fn().mockReturnValue(courseMocks.store.getters.loadedCourse),
        isOwner: jest.fn().mockReturnValue(true)
      },
      propsData: {
        id: 1
      }
    })
  })

  test('Vue Instanse', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Register button is present', () => {
    const registerBtn = wrapper.find('button.primary')

    expect(
      registerBtn
        .text()
        .trim()
        .includes('Register')
    ).toBe(true)
  })

  test("Edit button is present (User is course's owner)", () => {
    const editBtn = wrapper.find('a.success')

    expect(
      editBtn
        .text()
        .trim()
        .includes('Edit')
    ).toBe(true)
  })

  test('Try to edit the course', () => {
    const editBtn = wrapper.find('a.success')
    const onDeleteCourse = jest.fn()

    editBtn.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(onDeleteCourse).toBeCalled()
      expect(wrapper.vm.$route.name).toEqual('EditCourse')
    })
  })

  test('Try to delete the course', () => {
    const deleteBtn = wrapper.find('button.warninig')
    const onDeleteCourse = jest.fn()

    deleteBtn.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(onDeleteCourse).toBeCalled()
    })
  })

  test('User is not owner, then no `Delete` button', () => {
    const newWrapper = shallow(Course, {
      store: courseMocks.store,
      localVue,
      router,
      computed: {
        course: jest.fn().mockReturnValue(courseMocks.store.getters.loadedCourse),
        isOwner: jest.fn().mockReturnValue(false)
      },
      propsData: {
        id: 2
      }
    })

    expect(newWrapper.contains('button.warning')).toBeFalsy()
  })
})
