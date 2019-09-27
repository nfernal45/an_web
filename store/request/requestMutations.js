import { mutationTypes } from '@/store/types/request'

export default {
  [mutationTypes.SET_REQUEST]: (state, requestData) => {
    state.request = requestData
  }
}
