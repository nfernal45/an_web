import { actionTypes, mutationTypes } from '@/store/types/references'
import fetchRequestStatusesOptions from '@/services/api/references/fetchRequestStatusesOptions'

export default {
  async [actionTypes.FETCH_REQUEST_STATUSES_OPTIONS]({ commit }) {
    const requestStatusesOptions = await fetchRequestStatusesOptions({
      axiosModule: this.$axios
    })

    commit(mutationTypes.SET_REQUEST_STATUSES_OPTIONS, requestStatusesOptions)
  }
}
