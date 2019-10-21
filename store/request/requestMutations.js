import { mutationTypes } from '@/store/types/request'

export default {
  [mutationTypes.SET_REQUEST]: (state, requestData) => {
    state.request = requestData
  },
  [mutationTypes.SET_REQUEST_STATUSES]: (state, requestStatuses) => {
    state.requestStatuses = requestStatuses
  },
  [mutationTypes.SET_VERSION]: (state, value) => {
    state.request.versionNumber = value
  },
  [mutationTypes.SET_PROP]: (state, { propName, propValue }) => {
    state.request[propName] = propValue
  }
}
