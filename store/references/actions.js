import { actions, mutations } from '../types/references'

export default {
  [actions.GET_REFERENCE]: async (
    { commit },
    { referenceUrl, referenceName, search }
  ) => {
    const { data } = await this.$axios({
      url: referenceUrl,
      params: search
    })
    commit(mutations[referenceName], data)
  }
}
