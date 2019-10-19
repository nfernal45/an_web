import { mutationTypes } from '@/store/types/appeal'

export default {
  [mutationTypes.SET_APPEAL]: (state, appealData) => {
    state.appeal = appealData
  },
  [mutationTypes.SET_VERSION]: (state, value) => {
    state.appeal.versionNumber = value
  }
}
