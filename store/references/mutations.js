import { mutations } from '@/store/types/references'

export default {
  [mutations.SET_REFERENCE]: (state, referenceName, value) => {
    state[referenceName] = value
  }
}
