import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedCourses: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedCourses (state, payload) {
      state.loadedCourses = payload
    },
    createCourse (state, payload) {
      state.loadedCourses.push(payload)
    },
    updateCourse (state, payload) {
      const course = state.loadedCourses.find(course => {
        return course.id === payload.id
      })
      if (payload.title) {
        course.title = payload.title
      }
      if (payload.description) {
        course.description = payload.description
      }
      if (payload.date) {
        course.date = payload.date
      }
    },
    deleteCourse (state, payload) {
      const courses = state.loadedCourses
      const idx = state.loadedCourses.findIndex(course => {
        return course.id === payload
      })
      courses.splice(idx, 1)
      state.loadedCourses = [...courses]
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadCourses ({ commit }) {
      commit('setLoading', true)
      firebase
        .database()
        .ref('courses')
        .once('value')
        .then(data => {
          const courses = []
          const obj = data.val()
          for (let key in obj) {
            courses.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedCourses', courses)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log('loadCourses', error)
          commit('setLoading', false)
        })
    },
    createCourse ({ commit, getters }, payload) {
      const course = {
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: {
          start: payload.date.start.toISOString(),
          end: payload.date.end.toISOString()
        },
        creatorId: getters.user.id
      }
      firebase
        .database()
        .ref('courses')
        .push(course)
        .then(data => {
          const key = data.key
          commit('createCourse', {
            ...course,
            id: key
          })
        })
        .catch(error => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateCourseData ({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase
        .database()
        .ref('courses')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateCourse', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    deleteCourseData ({ commit }, payload) {
      commit('setLoading', true)
      firebase
        .database()
        .ref('courses')
        .child(payload)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('deleteCourse', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredCourses: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredCourses: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredCourses: [] })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadedCourses (state) {
      return state.loadedCourses.sort((courseA, courseB) => {
        return courseA.date > courseB.date
      })
    },
    featuredCourses (state, getters) {
      return getters.loadedCourses.slice(0, 5)
    },
    loadedCourse (state) {
      return courseId => {
        return state.loadedCourses.find(course => {
          return course.id === courseId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
