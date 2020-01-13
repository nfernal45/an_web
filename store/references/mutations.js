import { mutationTypes } from '@/store/types/references'

export default {
  [mutationTypes.SET_REQUEST_STATUSES_OPTIONS]: (
    state,
    requestStatusesOptions
  ) => {
    state.requestStatusesOptions = requestStatusesOptions
  }
}
