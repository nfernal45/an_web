import { actionTypes, mutationTypes } from '@/store/types/request'
import fetchRequestRecord from '@/services/api/requests/fetchRequestRecord'
import saveRequestRecord from '~/services/api/requests/saveRequestRecord'
import fetchNextRequestStatuses from '~/services/api/requests/fetchNextRequestStatuses'
// import gfAbeyancesByRequestId from '@/constants/request/gfAbeyancesByRequestId'

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
      const request = await fetchRequestRecord({
        axiosModule: this.$axios,
        router: this.$router,
        requestId
      })
      delete request._links
      await dispatch(mutationTypes.SET_REQUEST, request)
      dispatch(actionTypes.FETCH_REQUEST_STATUSES)
    } catch (error) {
      throw error
    }
  },

  async [actionTypes.SAVE_REQUEST]({ state, commit }) {
    try {
      const data = await saveRequestRecord(this.$axios, state.request)
      await commit(mutationTypes.SET_REQUEST, data)
    } catch (error) {
      throw error
    }
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

  [actionTypes.CREATE_ABEYANCE]({ state, commit }) {
    commit(mutationTypes.SET_ARRAY, {
      arrayName: 'gfAbeyancesByRequestId',
      arrayValue: state.gfAbeyancesByRequestIdDefault()
    })
  },

  [actionTypes.SET_REQUEST]({ commit }, request) {
    if (!request.requestId) {
      console.log('new request')

      const defaultArraysNames = ['gfAbeyancesByRequestId']
      // const defaultRequest = {}

      defaultArraysNames.forEach((defaultObject) => {
        commit(mutationTypes.SET_DEFAULT_OBJECT, {
          objectName: `${defaultObject}Default`,
          objectValue: Object.assign({}, request[defaultObject][0])
        })

        // defaultRequest = Object.assign({}, request, {
        //   gfAbeyancesByRequestId: null,
        //   gfAttachedDocsByRequestId: null,
        //   gfQueriedDocsByRequestId: null,
        //   gfRefusalReasonRequestId: null
        // })
      })

      defaultArraysNames.reduce(
        (defaultRequest, currentValue, currentIndex, arr) => {
          console.log(defaultRequest, currentValue, currentIndex, arr)
        }
      )

      request = Object.assign({}, request, {
        gfAbeyancesByRequestId: null,
        gfAttachedDocsByRequestId: null,
        gfQueriedDocsByRequestId: null,
        gfRefusalReasonRequestId: null
      })
    }
    // eslint-disable-next-line no-console
    // console.log(request)
    commit(mutationTypes.SET_REQUEST, request)
  }
}
