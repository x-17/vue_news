import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from "@/utils/token.js";
// import Login from "@/views/Login.vue"
// import Layout from '@/views/Layout.vue'
// import Home from '@/views/Home.vue'
// import User from "@/views/User.vue"
// import Search from '@/views/Search.vue'
// import SearchResult from '@/views/SearchResult.vue'
// import ArticleDetail from "@/views/ArticleDetail.vue";
// import UserEdit from "@/views/UserEdit.vue"

Vue.use(VueRouter)

//路由懒加载
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
    },
    {
      path: '/layout',
      component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout.vue'),
      redirect: '/layout/home',
      children: [
        {
          path: 'home',
          component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
        },
        {
          path: 'user',
          component: () => import(/* webpackChunkName: "User" */ '@/views/User.vue')
        }
      ]
    },
    {
      path: '/search',
      component: () => import(/* webpackChunkName: "Search" */ '@/views/Search.vue')
    },
    {
      path: '/search_result/:kw',
      component: () => import(/* webpackChunkName: "SearchResult" */ '@/views/SearchResult.vue'),
      props: true
    },
    {
      path: '/article_detail/:art_id',
      component: () => import(/* webpackChunkName: "ArticleDetail" */ '@/views/ArticleDetail.vue'),
      props: true
    },
    {
      path: '/useredit',
      component: () => import(/* webpackChunkName: "UserEdit" */ '@/views/UserEdit.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login' && getToken()?.length > 0) {
    next(false)
  }
  else {
    next()
  }
})
export default router
