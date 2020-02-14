import { getterTypes } from '@/store/types/references'

export default {
  [getterTypes.GET_REQUEST_STATUSES_OPTIONS_CONSTANTS](state) {
    return state.requestStatusesOptions.reduce((result, item, index, array) => {
      result[item.statusShortName] = item.statusId
      return result
    }, {})
  }
}
