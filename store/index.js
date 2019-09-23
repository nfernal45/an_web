import Vue from 'vue'
import Vuex from 'vuex'
import request from './request'
import references from './references'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    modules: {
      request,
      references
    }
  })
