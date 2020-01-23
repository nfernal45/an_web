import { mutationTypes } from '@/store/types/references'

export default {
  [mutationTypes.SET_REQUEST_STATUSES_OPTIONS]: (
    state,
    requestStatusesOptions
  ) => {
    state.requestStatusesOptions = requestStatusesOptions
  },
  [mutationTypes.SET_GLOBAL_SEARCH_FILTERS]: (state, searchString) => {
    state.globalSearchFilters = searchString
  },
  [mutationTypes.SET_GLOBAL_SEARCH_FILTERS_SETTINGS]: (
    state,
    settingsObject
  ) => {
    state.globalSearchFiltersSettings = settingsObject
  },
  [mutationTypes.SET_GLOBAL_SEARCH_ADDRESS_FILTERS_SETTINGS]: (
    state,
    settingsObject
  ) => {
    state.globalSearchAddressFiltersSettings = settingsObject
  }
}
