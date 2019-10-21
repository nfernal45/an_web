import { actionTypes, mutationTypes } from '@/store/types/appeal'
import getAppealRecord from '@/services/api/requests/getAppealRecord'
import saveAppealRecord from '~/services/api/requests/saveAppealRecord'
import fetchNextRequestStatuses from '~/services/api/requests/fetchNextRequestStatuses'

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

  async [actionTypes.FETCH_APPEAL]({ commit, dispatch }, appealId) {
    const appeal = await getAppealRecord({
      axiosModule: this.$axios,
      router: this.$router,
      appealId
    })
    delete appeal._links
    commit(mutationTypes.SET_APPEAL, appeal)
    dispatch(actionTypes.FETCH_REQUEST_STATUSES)
  },

  async [actionTypes.SAVE_APPEAL]({ state }) {
    await saveAppealRecord(this.$axios, state.appeal)
  },

  async [actionTypes.FETCH_REQUEST_STATUSES]({ state, commit }) {
    const requestStatuses = await fetchNextRequestStatuses({
      axiosModule: this.$axios,
      requestId: state.appeal.requestId
    })

    commit(mutationTypes.SET_REQUEST_STATUSES, requestStatuses)
  }
}
