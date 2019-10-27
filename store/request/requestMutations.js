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
  [mutationTypes.SET_PROP_DOC_CHECK]: (state, { propName, propValue }) => {
    state.docCheck[propName] = propValue
  },
  [mutationTypes.SET_ARRAY]: (state, { propName, propValue }) => {
    Vue.set(state.request, propName, propValue)
  },
  [mutationTypes.SET_ARRAY_OBJECT_PROP]: (
    state,
    { arrayName, propName, propValue, propIndex }
  ) => {
    const array = state.request[arrayName]
    const item = array[propIndex]
    Vue.set(item, propName, propValue)
  },
  [mutationTypes.SET_DEFAULT_OBJECT]: (state, { objectName, objectValue }) => {
    state[objectName] = objectValue
  }
}
