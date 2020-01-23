<template lang="pug">
  div
    // Соответствие заявления и документов требованиям порядка
    doc-check-violations

</template>
<script>
import { mapState, mapGetters } from 'vuex'

import docCheckViolations from '@/components/request/docCheck/docCheckViolations'
import { getterTypes as requestGettersTypes } from '@/store/types/request'
const requestModuleName = 'request'

export default {
  name: 'RequestDocCheckPage',
  components: { docCheckViolations },
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
