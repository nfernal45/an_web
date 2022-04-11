import { getterTypes as requestGetterTypes } from '@/store/types/request'
import { getterTypes as referencesGetterTypes } from '@/store/types/references'

export default {
  activeRequestTabs() {},
  [requestGetterTypes.GET_REQUEST_PAGES_ACTIVE_STATUSES](
    state,
    getters,
    rootState,
    rootGetters
  ) {
    const requestPages = ['queried-docs', 'abeyance', 'doc-check', 'decision']
    const requestOptionsConstants =
      // eslint-disable-next-line prettier/prettier
      rootGetters[`references/${referencesGetterTypes.GET_REQUEST_STATUSES_OPTIONS_CONSTANTS}`]

    return requestPages.reduce((result, item, index, array) => {
      let activeStatuses = []

      switch (item) {
        case 'queried-docs':
          activeStatuses = [
            requestOptionsConstants.REGISTERED,
            requestOptionsConstants.DOCSQUERIED,
            requestOptionsConstants.INFORMATIONRECEIVED,
            requestOptionsConstants.REVIEW,
            requestOptionsConstants.DECISIONPREPARING,
            requestOptionsConstants.DECISIONMADE,
            requestOptionsConstants.NOTICEPREPARING,
            requestOptionsConstants.VIOLATIONELIMINATION,
            requestOptionsConstants.RESUMED,
            requestOptionsConstants.DOCSQUERIED2,
            requestOptionsConstants.INFORMATIONRECEIVED2
          ]
          break

        case 'abeyance':
          if (
            state.request.gfAbeyancesByRequestId &&
            state.request.gfAbeyancesByRequestId.length
          ) {
            activeStatuses = [
              requestOptionsConstants.REVIEW,
              requestOptionsConstants.DECISIONPREPARING,
              requestOptionsConstants.DECISIONMADE,
              requestOptionsConstants.NOTICEPREPARING,
              requestOptionsConstants.VIOLATIONELIMINATION,
              requestOptionsConstants.RESUMED,
              requestOptionsConstants.DOCSQUERIED2,
              requestOptionsConstants.INFORMATIONRECEIVED2
            ]
          } else {
            activeStatuses = [requestOptionsConstants.NOTICEPREPARING]
          }
          break

        case 'doc-check':
          activeStatuses = [
            requestOptionsConstants.REGISTERED,
            requestOptionsConstants.DOCSQUERIED,
            requestOptionsConstants.INFORMATIONRECEIVED,
            requestOptionsConstants.REVIEW,
            requestOptionsConstants.DECISIONPREPARING,
            requestOptionsConstants.DECISIONMADE,
            requestOptionsConstants.NOTICEPREPARING,
            requestOptionsConstants.VIOLATIONELIMINATION,
            requestOptionsConstants.RESUMED,
            requestOptionsConstants.DOCSQUERIED2,
            requestOptionsConstants.INFORMATIONRECEIVED2
          ]
          break

        case 'decision':
          activeStatuses = [
            requestOptionsConstants.REVIEW,
            requestOptionsConstants.DECISIONPREPARING,
            requestOptionsConstants.DECISIONMADE
          ]
          break
      }

      result[item] = activeStatuses
      return result
    }, {})
  }
}
