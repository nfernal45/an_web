import { actionTypes, mutationTypes } from '@/store/types/request'
import getRequestRecord from '@/services/api/requests/getRequestRecord'
import saveRequestRecord from '~/services/api/requests/saveRequestRecord'
import fetchNextRequestStatuses from '~/services/api/requests/fetchNextRequestStatuses'

export default {
  [actionTypes.FETCH_REQUEST_LIST]: async ({ commit }) => {
    const { data } = await this.$axios.$get()
    commit(mutationTypes.SET_REQUEST_LIST, data)
  },

  [actionTypes.RESET_REQUEST_LIST]: ({ commit }) => {
    commit(mutationTypes.SET_REQUEST_LIST, [])
  },

  [actionTypes.RESET_REQUEST]: ({ state, commit }) => {
    commit(mutationTypes.SET_REQUEST, state.requestDefaultState())
  },

  async [actionTypes.FETCH_REQUEST]({ commit, dispatch }, requestId) {
    const request = await getRequestRecord({
      axiosModule: this.$axios,
      router: this.$router,
      requestId
    })
    delete request._links
    commit(mutationTypes.SET_REQUEST, request)
    dispatch(actionTypes.FETCH_REQUEST_STATUSES)
  },

  async [actionTypes.SAVE_REQUEST]({ state, dispatch }) {
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
