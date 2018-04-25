import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Courses from '@/components/Course/Courses'
import CreateCourse from '@/components/Course/CreateCourse'
import EditCourse from '@/components/Course/EditCourse'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Course from '@/components/Course/Course'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/course/new',
      name: 'CreateCourse',
      component: CreateCourse,
      beforeEnter: AuthGuard
    },
    {
      path: '/courses/:id',
      name: 'Course',
      props: true,
      component: Course
    },
    {
      path: '/courses/:id/edit',
      name: 'EditCourse',
      props: true,
      component: EditCourse,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
