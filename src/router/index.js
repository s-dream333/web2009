import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/Home.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "Layout",
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          isLogin: true
        }
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/main/Params.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/main/Product.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'ad',
        name: 'AD',
        component: () => import('../views/main/AD.vue'),
        meta: {
          isLogin: true
        }
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('../views/main/Sub/Details.vue'),
        children:[
          {
            path: 'golife',
            name: 'golife',
            component: () => import('../views/main/Sub/golife.vue')
          },
          {
            path: 'heigh',
            name: 'heigh',
            component: () => import('../views/main/Sub/heigh.vue')
          },
          {
            path: 'logo',
            name: 'logo',
            component: () => import('../views/main/Sub/logo.vue')
          },
          {
            path: 'openproduct',
            name: 'openproduct',
            component: () => import('../views/main/Sub/openproduct.vue')
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
