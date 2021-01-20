import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function createRouter (initState, options) {
  const {base} = options
  return new VueRouter({
    mode: 'history',
    base,
    routes: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../pages/Login/index.vue')
      }, {
        path: '/markdown',
        name: 'markdown',
        component: () => import('../pages/Markdown/index.vue')
      }, {
        path: '/previewMD',
        name: 'previewMD',
        component: () => import('../pages/Markdown/preview.vue')
      }, {
        path: '/markdown/:id',
        name: 'markdownEdit',
        component: () => import('../pages/Markdown/index.vue')
      }, {
      path: '/',
      redirect: '/home',
      component: () => import('../pages/main.vue'),
      children: [{
        path: '/home',
        name: 'home',
        component: () => import('../pages/Home/index.vue')
      }, {
        path: '/threejs',
        name: 'threejs',
        components: () => import('../pages/Threejs/index.vue')
      }, {
        path: '/:secondType',
        name: 'classificationPage',
        component: () => import('../pages/CftPage/index.vue')
      }, {
        path: '/:secondType/:id',
        name: 'detail',
        component: () => import('../pages/Detail/index.vue')
      }]
    }]
  })
}
