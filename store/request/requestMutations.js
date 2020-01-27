import Vue from 'vue'
import { mutationTypes } from '@/store/types/request'

export default {
  [mutationTypes.SET_REQUEST]: (state, requestData) => {
    Vue.set(state, 'request', requestData)
  },

  [mutationTypes.SET_REQUEST_STATUSES]: (state, requestStatuses) => {
    state.requestStatuses = requestStatuses
  },

  [mutationTypes.SET_PROP]: (state, { propName, propValue }) => {
    state.request[propName] = propValue
  },

  [mutationTypes.SET_ARRAY]: (state, { propName, propValue }) => {
    Vue.set(state.request, propName, propValue)
  },

  [mutationTypes.SET_ARRAY_OBJECT_PROP]: (
    state,
    { arrayName, propName, propValue, propIndex }
  ) => {
    const array = state[arrayName]
    const item = array[propIndex]
    Vue.set(item, propName, propValue)
  },

  [mutationTypes.SET_DEFAULT_OBJECT]: (state, { objectName, objectValue }) => {
    state[objectName] = objectValue
  },

  [mutationTypes.SET_LICENSEE_ATTAHCHED_DOCS]: (state, value) => {
    state.licenseeAttachedDocs = value
  },

  [mutationTypes.SET_MZHI_ATTAHCHED_DOCS]: (state, value) => {
    state.mzhiAttachedDocs = value
  },

  [mutationTypes.SET_INTERNAL_ATTACHED_DOCS]: (state, value) => {
    state.internalAttachedDocs = value
  },

  // Doc check
  [mutationTypes.SET_DOC_CHECK]: (state, value) => {
    state.docCheck = value
  },

  [mutationTypes.SET_PROP_DOC_CHECK]: (state, { propName, propValue }) => {
    state.docCheck[propName] = propValue
  },

  [mutationTypes.SET_DOC_CHECK_PRIMARY_INSPECTION_RESULT]: (
    state,
    { value, violationGroupId }
  ) => {
    state.docCheck.gfCheckViolationsByCheckId.find(
      (violationGroup) => violationGroup.id === violationGroupId
    ).primaryInspResultId = value
  },

  [mutationTypes.SET_DOC_CHECK_ABEYANCE_INSPECTION_RESULT]: (
    state,
    { value, violationGroupId }
  ) => {
    state.docCheck.gfCheckViolationsByCheckId.find(
      (violationGroup) => violationGroup.id === violationGroupId
    ).abeyanceInspResultId = value
  },

  [mutationTypes.SET_DOC_CHECK_INSPECTION_DESCRIPTION]: (
    state,
    { value, violationGroupId, inspectionType }
  ) => {
    state.docCheck.gfCheckViolationsByCheckId.find(
      (violationGroup) => violationGroup.id === violationGroupId
    )[inspectionType] = value
  }
}
