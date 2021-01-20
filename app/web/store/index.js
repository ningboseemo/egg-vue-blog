import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore (initState = {}) {
  return new Vuex.Store({
    state: {
      count: 0
    }
  })
}
