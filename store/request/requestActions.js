import { actionTypes, mutationTypes } from '@/store/types/request'
import fetchRequestRecord from '@/services/api/requests/fetchRequestRecord'
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
    commit(mutationTypes.SET_REQUEST, {})
  },

  async [actionTypes.FETCH_REQUEST]({ dispatch }, requestId) {
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

  [actionTypes.SET_REQUEST]({ commit }, request) {
    if (!request.requestId) {
      const defaultArraysNames = [
        'gfAbeyancesByRequestId',
        'gfAttachedDocsByRequestId',
        'gfQueriedDocsByRequestId',
        'gfRefusalReasonRequestId'
      ]

      defaultArraysNames.forEach((defaultObject) => {
        request = Object.assign({}, request, { [defaultObject]: null })
      })
    }

    commit(mutationTypes.SET_REQUEST, request)
  },

  async [actionTypes.FETCH_DEFAULT_OBJECTS]({ state, commit }) {
    const defaultObjectsNames = [
      'gfAbeyancesByRequestId',
      'gfAttachedDocsByRequestId',
      'gfQueriedDocsByRequestId',
      'gfRefusalReasonRequestId'
    ]

    const defaultObjectsArray = defaultObjectsNames.map((defaultObject) => {
      return state[`${defaultObject}Default`]
    })

    if (defaultObjectsArray.some((defaultObject) => !defaultObject)) {
      const defaultRequest = await fetchRequestRecord({
        axiosModule: this.$axios,
        router: this.$router,
        requestId: 'empty'
      })

      defaultObjectsNames.forEach((defaultObject) => {
        commit(mutationTypes.SET_DEFAULT_OBJECT, {
          objectName: `${defaultObject}Default`,
          objectValue: () => Object.assign({}, defaultRequest[defaultObject][0])
        })
      })
    }
  },

  async [actionTypes.CREATE_ABEYANCE]({ state, commit, dispatch }) {
    await dispatch(actionTypes.FETCH_DEFAULT_OBJECTS)
    await commit(mutationTypes.SET_ARRAY, {
      arrayName: 'gfAbeyancesByRequestId',
      arrayValue: state.gfAbeyancesByRequestIdDefault()
    })
  }
}
