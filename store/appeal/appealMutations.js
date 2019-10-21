import { mutationTypes } from '@/store/types/appeal'

export default {
  [mutationTypes.SET_APPEAL]: (state, appealData) => {
    state.appeal = appealData
  },
  [mutationTypes.SET_REQUEST_STATUSES]: (state, requestStatuses) => {
    state.requestStatuses = requestStatuses
  },
  [mutationTypes.SET_VERSION]: (state, value) => {
    state.appeal.versionNumber = value
  },
  [mutationTypes.SET_PROP]: (state, { propName, propValue }) => {
    state.appeal[propName] = propValue
  }
}
