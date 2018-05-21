import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Chat from '@/components/Chat'
import Login from '@/components/Login'
import SocketTest from '@/components/SocketTest'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat,
      beforeEnter: (from, to, next) => {
        if (store.state.user.email) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (from, to, next) => {
        if (store.state.user.email) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/sockettest',
      name: SocketTest,
      component: SocketTest
    }
  ]
})

export default router
