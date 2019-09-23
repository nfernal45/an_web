import { actions, mutations } from '@/store/types/request'

export default {
  [actions.GET_REQUEST_LIST]: async ({ commit }) => {
    const { data } = await this.$axios.$get()
    commit(mutations.SET_REQUEST_LIST, data)
  },

  [actions.RESET_REQUEST_LIST]: ({ commit }) => {
    commit(mutations.SET_REQUEST_LIST, [])
  },

  [actions.RESET_REQUEST]: ({ state, commit }) => {
    commit(mutations.SET_REQUEST, state.requestDefaultState())
  }
}
