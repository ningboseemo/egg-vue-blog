import Vue from 'vue'
import {
  Input,
  Button,
  Tag,
  Page,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Spin,
  Message,
  Icon,
  Menu,
  MenuItem,
  Submenu,
  MenuGroup,
  Collapse,
  Panel,
  List,
  ListItem,
  Modal
} from 'view-design'
import VueMarkdown from 'vue-markdown'
import { sync } from 'vuex-router-sync'
import 'view-design/dist/styles/iview.css'
import createHttp from './utils/http'
import 'mavon-editor/dist/css/index.css'

Vue.component('VueMarkdown', VueMarkdown)
Vue.component('v-input', Input)
Vue.component('v-button', Button)
Vue.component('v-tag', Tag)
Vue.component('v-page', Page)
Vue.component('v-dropdown', Dropdown)
Vue.component('v-dropdownMenu', DropdownMenu)
Vue.component('v-dropdownItem', DropdownItem)
Vue.component('v-spin', Spin)
Vue.component('v-icon', Icon)
Vue.component('v-menu', Menu)
Vue.component('v-menuItem', MenuItem)
Vue.component('v-submenu', Submenu)
Vue.component('v-menu-group', MenuGroup)
Vue.component('v-collapse', Collapse)
Vue.component('v-panel', Panel)
Vue.component('v-list', List)
Vue.component('v-list-item', ListItem)
Vue.component('v-modal', Modal)

Vue.prototype.$Message = Message

export default class App {
  constructor(config) {
    this.config = config
  }

  bootstrap() {
    if (EASY_ENV_IS_NODE) {
      return this.server()
    }
    return this.client()
  }

  create(initState) {
    const { index, options, createStore, createRouter } = this.config
    const store = createStore(initState, options)
    const router = createRouter(initState, options)
    sync(store, router)
    return {
      ...index,
      ...options,
      router,
      store
    }
  }

  client() {
    // Vue.prototype.$http = require('axios')
    const options = this.create(window.__INITIAL_STATE__)
    const { router, store } = options
    router.beforeEach((route, redirec, next) => {
      next()
    })
    router.afterEach((route, redirec) => {
      console.log('>>afterEach', route)
      if (route.matched && route.matched.length) {
        const asyncData = route.matched[0].components.default.asyncData
        if (asyncData) {
          asyncData(store, route)
        }
      }
    })
    const app = new Vue(options)
    const root = document.getElementById('app')
    const hydrate = root.childNodes.length > 0
    app.$mount('#app', hydrate)
    Vue.prototype.$http = createHttp(app)
    return app
  }

  server() {
    return context => {
      const options = this.create(context.state)
      const { store, router } = options
      router.push(context.state.url)
      return new Promise((resolve, reject) => {
        router.onReady(() => {
          const matchedComponents = router.getMatchedComponents()
          if (!matchedComponents) {
            return reject({ code: '404' })
          }
          return Promise.all(
            matchedComponents.map(component => {
              if (component.asyncData) {
                return component.asyncData(store, store.state.route)
              }
              return null
            })
          ).then(() => {
            context.state = {
              ...store.state,
              ...context.state
            }
            return resolve(new Vue(options))
          })
        })
      })
    }
  }
}
