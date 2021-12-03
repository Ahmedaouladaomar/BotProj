import Vue from 'vue';
import Router from 'vue-router';
import Overview from '@/components/Overview'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import autharea from '@/components/autharea'
import Widget from '@/components/Widget'


import store from '../store'
import http from '../http-common';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      beforeEnter: (to, from, next) => {
        const logged = store.state.user
        if( !logged ) next({ name: 'login' })
        else{
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/Login',
      name: 'login',
      components:{
        Login: Login
      }
    },
    {
    path: '/logout',
      beforeEnter: (to, from, next) => {
        
        http.post("/user/logout").then(function(){    
        store.commit('setUser', null)
        //ls.remove("user")
        next({ name: 'login'}) 
      })
    }
  },
    {
      path: '/Home',
      name: 'home',
      components: {
        Overview: Overview
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          components: {
            Dashboard: Dashboard
          },
          props: { page: 1 },
          alias: '/'
        },
        {
          path: '/Widget',
          components: {
            Widget: Widget
          }
        },
        {
          path: '/profile',
          name: 'Profile',
          props: { page: 2 },
          components: {
            Profile: Profile 
          }
        },
        {
          path: '/auth',
          components: autharea
        },
        {
          path: '/doc',
          name: 'doc',
          props: { page: 5 },
          components: Login
        },
      ],
      beforeEnter: (to, from, next) => {
        const logged = store.state.user
        if( !logged ) next({ name: 'login' })
        else{
          next()
        }
      }
    },
   
  ]
})