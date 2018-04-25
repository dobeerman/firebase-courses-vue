import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import VueMoment from 'vue-moment'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.use(VueMoment)

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCoEHJKe-UXET6THMhwgMxbyVzbP4yky3Q',
      authDomain: 'fm-dev-59399.firebaseapp.com',
      databaseURL: 'https://fm-dev-59399.firebaseio.com',
      projectId: 'fm-dev-59399',
      storageBucket: 'fm-dev-59399.appspot.com',
      messagingSenderId: '676793341285'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadCourses')
  }
})
