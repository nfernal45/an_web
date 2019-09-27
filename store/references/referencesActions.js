import { actionTypes, mutationTypes } from '../types/references'

export default {
  [actionTypes.FETCH_REFERENCE]: async (
    { commit },
    { referenceUrl, referenceName, search }
  ) => {
    const { data } = await this.$axios({
      url: referenceUrl,
      params: search
    })
    commit(mutationTypes[referenceName], data)
  }
}
