import { mutationTypes } from '@/store/types/references'

export default {
  [mutationTypes.SET_REFERENCE]: (state, referenceName, value) => {
    state[referenceName] = value
  }
}
