import { actionTypes, mutationTypes } from '@/store/types/request'
import getRequestRecord from '@/services/api/requests/getRequestRecord'
import saveRequestRecord from '~/services/api/requests/saveRequestRecord'
import fetchNextRequestStatuses from '~/services/api/requests/fetchNextRequestStatuses'
import gfAbeyancesByRequestId from '@/constants/request/gfAbeyancesByRequestId'
import fetchDocCheckByRequestId from '@/services/api/requests/fetchDocCheckByRequestId'
import saveDocCheck from '@/services/api/requests/saveDocCheck'

export default {
  [actionTypes.FETCH_REQUEST_LIST]: async ({ commit }) => {
    const { data } = await this.$axios.$get()
    commit(mutationTypes.SET_REQUEST_LIST, data)
  },

  [actionTypes.RESET_REQUEST_LIST]: ({ commit }) => {
    commit(mutationTypes.SET_REQUEST_LIST, [])
  },

  [actionTypes.RESET_REQUEST]: ({ state, commit }) => {
    commit(mutationTypes.SET_REQUEST, {})
  },

  async [actionTypes.FETCH_REQUEST]({ commit, dispatch }, requestId) {
    try {
      const request = await getRequestRecord({
        axiosModule: this.$axios,
        router: this.$router,
        requestId
      })
      delete request._links
      commit(mutationTypes.SET_REQUEST, request)
      dispatch(actionTypes.FETCH_REQUEST_STATUSES)
    } catch (error) {
      throw error
    }
  },

  async [actionTypes.SAVE_REQUEST]({ state, commit, dispatch }) {
    const data = await saveRequestRecord(this.$axios, state.request)
    await commit(mutationTypes.SET_REQUEST, data)

    // Логика ниже нужна для корректного сохранения сущности doc-check.
    // Поместил её сюда, что бы по кнопке "Сохранить", сохранялось всё вместе.
    const docCheck = Object.assign({}, state.docCheck)

    await dispatch(actionTypes.FETCH_DOC_CHECK, state.request.requestId)
    docCheck.versionNumber = state.docCheck.versionNumber

    await commit(mutationTypes.SET_DOC_CHECK, docCheck)
    await dispatch(actionTypes.SAVE_DOC_CHECK)
  },

  async [actionTypes.FETCH_REQUEST_STATUSES]({ state, commit }) {
    if (state.request.requestId) {
      const requestStatuses = await fetchNextRequestStatuses({
        axiosModule: this.$axios,
        requestId: state.request.requestId
      })
      commit(mutationTypes.SET_REQUEST_STATUSES, requestStatuses)
    }
  },

  [actionTypes.CREATE_ABEYANCE]({ commit }) {
    commit(mutationTypes.SET_ARRAY, {
      arrayName: 'gfAbeyancesByRequestId',
      arrayValue: [gfAbeyancesByRequestId()]
    })
  },
  async [actionTypes.FETCH_DOC_CHECK]({ state, commit }, requestId) {
    const { data } = await fetchDocCheckByRequestId({
      axiosModule: this.$axios,
      requestId
    })

    if (data.length) commit(mutationTypes.SET_DOC_CHECK, data[0])
  },
  async [actionTypes.SAVE_DOC_CHECK]({ state, commit }) {
    const data = await saveDocCheck({
      axiosModule: this.$axios,
      requestId: state.request.requestId,
      docCheckEntity: state.docCheck
    })

    commit(mutationTypes.SET_DOC_CHECK, data)
  }
}
