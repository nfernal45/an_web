import { mutations } from '@/store/types/request'

export default {
  [mutations.SET_REQUEST]: (state, requestData) => {
    state.request = requestData
  }
}
