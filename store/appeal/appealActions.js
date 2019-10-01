import { actionTypes, mutationTypes } from '@/store/types/appeal'

export default {
  [actionTypes.FETCH_APPEAL_LIST]: async ({ commit }) => {
    const { data } = await this.$axios.$get()
    commit(mutationTypes.SET_APPEAL_LIST, data)
  },

  [actionTypes.RESET_appeal_LIST]: ({ commit }) => {
    commit(mutationTypes.SET_APPEAL_LIST, [])
  },

  [actionTypes.RESET_appeal]: ({ state, commit }) => {
    commit(mutationTypes.SET_APPEAL, state.appealDefaultState())
  }
}
