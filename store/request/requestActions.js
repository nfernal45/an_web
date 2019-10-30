import { actionTypes, mutationTypes } from '@/store/types/request'
import fetchRequestRecord from '@/services/api/requests/fetchRequestRecord'
import saveRequestRecord from '~/services/api/requests/saveRequestRecord'
import fetchNextRequestStatuses from '~/services/api/requests/fetchNextRequestStatuses'
// import gfAbeyancesByRequestId from '@/constants/request/gfAbeyancesByRequestId'
import fetchDocCheckByRequestId from '@/services/api/requests/fetchDocCheckByRequestId'
import saveDocCheck from '@/services/api/requests/saveDocCheck'
import defaultDocCheck from '@/constants/defaultDocCheck'
import changeRequestStatus from '@/services/api/requests/changeRequestStatus'

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
    commit(mutationTypes.SET_LICENSEE_ATTAHCHED_DOCS, [])
    commit(mutationTypes.SET_MZHI_ATTAHCHED_DOCS, [])
  },

  async [actionTypes.FETCH_REQUEST]({ state, dispatch }, requestId) {
    const currentRequestId = requestId || state.request.requestId
    try {
      const request = await fetchRequestRecord({
        axiosModule: this.$axios,
        router: this.$router,
        requestId: currentRequestId
      })
      delete request._links
      await dispatch(mutationTypes.SET_REQUEST, request)
      dispatch(actionTypes.FETCH_REQUEST_STATUSES)
      dispatch(actionTypes.FETCH_DOC_CHECK)
    } catch (error) {
      throw error
    }
  },

  async [actionTypes.SAVE_REQUEST]({ state, commit, dispatch }) {
    try {
      const request = {
        ...state.request,
        gfAttachedDocsByRequestId: [
          ...state.licenseeAttachedDocs,
          ...state.mzhiAttachedDocs
        ]
      }
      const data = await saveRequestRecord(this.$axios, request)
      await commit(mutationTypes.SET_REQUEST, data)
      dispatch(actionTypes.FETCH_DOC_CHECK)
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
    } else {
      const licenseeAttachedDocs = request.gfAttachedDocsByRequestId
        .filter((attachedDoc) => {
          return (
            attachedDoc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId
              .groupId === 1
          )
        })
        .sort((prevDoc, nextDoc) => prevDoc.docId - nextDoc.docId)

      const mzhiAttachedDocs = request.gfAttachedDocsByRequestId
        .filter((attachedDoc) => {
          return (
            attachedDoc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId
              .groupId === 2
          )
        })
        .sort((prevDoc, nextDoc) => prevDoc.docId - nextDoc.docId)

      commit(mutationTypes.SET_LICENSEE_ATTAHCHED_DOCS, licenseeAttachedDocs)
      commit(mutationTypes.SET_MZHI_ATTAHCHED_DOCS, mzhiAttachedDocs)
      request.gfAttachedDocsByRequestId = null
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
  },

  async [actionTypes.FETCH_DOC_CHECK]({ state, commit }) {
    if (state.request.requestId && state.request.requestStatusId >= 2) {
      const data = await fetchDocCheckByRequestId({
        axiosModule: this.$axios,
        requestId: state.request.requestId
      })

      if (data.length) {
        commit(mutationTypes.SET_DOC_CHECK, data[0])
      } else if (state.request.requestStatusId === 2) {
        commit(
          mutationTypes.SET_DOC_CHECK,
          Object.assign({}, defaultDocCheck(), {
            requestId: state.request.requestId
          })
        )
      }
    }
  },

  async [actionTypes.SAVE_DOC_CHECK]({ state, commit }) {
    if (state.request.requestStatusId >= 2) {
      const data = await saveDocCheck({
        axiosModule: this.$axios,
        docCheckEntity: state.docCheck
      })
      commit(mutationTypes.SET_DOC_CHECK, data)
    }
  },

  async [actionTypes.CHANGE_REQUEST_STATUS]({ state, dispatch }, nextStatusId) {
    await dispatch(actionTypes.SAVE_REQUEST_RELATED)

    await changeRequestStatus({
      axiosModule: this.$axios,
      requestId: state.request.requestId,
      nextStatusId,
      requestStatusId: state.request.requestStatusId
    })

    await dispatch(actionTypes.FETCH_REQUEST)
  },

  async [actionTypes.SAVE_REQUEST_RELATED]({ dispatch }) {
    await dispatch(actionTypes.SAVE_DOC_CHECK)
    await dispatch(actionTypes.SAVE_REQUEST)
  }
}
