import { actionTypes, mutationTypes } from '@/store/types/request'
import getRequestRecord from '@/services/api/requests/getRequestRecord'
import saveRequestRecord from '~/services/api/requests/saveRequestRecord'
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
    commit(mutationTypes.SET_APPEAL, state.requestDefaultState())
  },

  async [actionTypes.FETCH_APPEAL]({ commit, dispatch }, requestId) {
    const request = await getRequestRecord({
      axiosModule: this.$axios,
      router: this.$router,
      requestId
    })
    delete request._links
    commit(mutationTypes.SET_APPEAL, request)
    dispatch(actionTypes.FETCH_REQUEST_STATUSES)
  },

  async [actionTypes.SAVE_APPEAL]({ state, dispatch }) {
    await saveRequestRecord(this.$axios, state.request)
  },

  async [actionTypes.FETCH_REQUEST_STATUSES]({ state, commit }) {
    const requestStatuses = await fetchNextRequestStatuses({
      axiosModule: this.$axios,
      requestId: state.request.requestId
    })

    commit(mutationTypes.SET_REQUEST_STATUSES, requestStatuses)
  }
}
