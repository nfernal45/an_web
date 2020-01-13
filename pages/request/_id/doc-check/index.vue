<template lang="pug">
  div
    // Направление документов на проверку в ЖН по АО
    doc-check-direction

    // Распоряжение на проведение проверки
    doc-check-order

    // Заключение по итогам проверки заявления и документов
    doc-check-conclusion
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import docCheckDirection from '@/components/request/docCheck/docCheckDirection'
import docCheckConclusion from '@/components/request/docCheck/docCheckConclusion'
import docCheckOrder from '@/components/request/docCheck/docCheckOrder'
import { getterTypes as requestGettersTypes } from '@/store/types/request'
const requestModuleName = 'request'

export default {
  name: 'RequestDocCheckPage',
  components: {
    docCheckDirection,
    docCheckConclusion,
    docCheckOrder
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        !vm.requestPagesActiveStatuses['doc-check'].includes(
          vm.request.request.requestStatusId
        )
      ) {
        next({ name: 'request-id-main', params: { id: to.params.id } })
      }
    })
  },
  computed: {
    ...mapState({
      request: (state) => state.request
    }),

    ...mapGetters(requestModuleName, {
      requestPagesActiveStatuses:
        requestGettersTypes.GET_REQUEST_PAGES_ACTIVE_STATUSES
    })
  }
}
</script>
<style lang="sass"></style>
