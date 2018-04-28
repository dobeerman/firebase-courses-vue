import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userCourse = {
  id: 1,
  title: 'Title',
  description: 'Description',
  imageUrl: 'imageUrl',
  date: {
    start: 'Sat Apr 28 2018 19:50:03 GMT+1000 (+10)',
    end: 'Sun Apr 29 2018 19:50:03 GMT+1000 (+10)'
  },
  creatorId: '100'
}

const state = {
  loadedCourses: [
    userCourse,
    {
      id: 2,
      title: 'Title',
      description: 'Description',
      imageUrl: 'imageUrl',
      date: {
        start: 'Mon Apr 30 2018 19:50:03 GMT+1000 (+10)',
        end: 'Thu May 1 2018 19:50:03 GMT+1000 (+10)'
      },
      creatorId: '101'
    }
  ]
}

export const mutations = {
  setLoadedCourses: jest.fn()
}

export const actions = {
  loadCourses: jest.fn(),
  createCourse: jest.fn(),
  deleteCourseData: jest.fn()
}

export const getters = {
  loadedCourses: jest.fn().mockReturnValue(state.loadedCourses),
  userCourses: jest.fn().mockReturnValue([userCourse]),
  loadedCourse: jest.fn().mockReturnValue(userCourse),
  isOwner: jest.fn().mockReturnValue(true)
}

export function __createMocks (custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  const mockGetters = Object.assign({}, getters, custom.getters)
  const mockMutations = Object.assign({}, mutations, custom.mutations)
  const mockActions = Object.assign({}, actions, custom.actions)
  const mockState = Object.assign({}, state, custom.state)

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState
    })
  }
}

export const store = __createMocks().store
