import { actionTypes, mutationTypes } from '@/store/types/appeal'
import getAppealRecord from '@/services/api/requests/getAppealRecord'
import saveAppealRecord from '~/services/api/requests/saveAppealRecord'

export default {
  [actionTypes.FETCH_APPEAL_LIST]: async ({ commit }) => {
    const { data } = await this.$axios.$get()
    commit(mutationTypes.SET_APPEAL_LIST, data)
  },

  [actionTypes.RESET_APPEAL_LIST]: ({ commit }) => {
    commit(mutationTypes.SET_APPEAL_LIST, [])
  },

  [actionTypes.RESET_APPEAL]: ({ state, commit }) => {
    commit(mutationTypes.SET_APPEAL, state.appealDefaultState())
  },

  async [actionTypes.FETCH_APPEAL]({ commit }, appealId) {
    const appeal = await getAppealRecord({
      axiosModule: this.$axios,
      router: this.$router,
      appealId
    })
    delete appeal._links
    commit(mutationTypes.SET_APPEAL, appeal)
  },

  async [actionTypes.SAVE_APPEAL]({ state, commit }) {
    await saveAppealRecord(this.$axios, state.appeal)
    const versionNumber = state.appeal.versionNumber + 1
    commit(mutationTypes.SET_VERSION, versionNumber)
  }
}
