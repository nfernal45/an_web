import { mutationTypes } from '@/store/types/appeal'

export default {
  [mutationTypes.SET_APPEAL]: (state, appealData) => {
    state.appeal = appealData
  },
  [mutationTypes.SET_REQUEST_STATUSES]: (state, requestStatuses) => {
    state.requestStatuses = requestStatuses
  }
}
