import { mutationTypes } from '@/store/types/appeal'

export default {
  [mutationTypes.SET_APPEAL]: (state, appealData) => {
    state.appeal = appealData
  }
}
