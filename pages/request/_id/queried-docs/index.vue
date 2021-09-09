<template lang="pug">
  el-row
    // Межвед. запросы
    queried-docs-interdept-request(:disabledEditing='disabledEditing || isRequestSaving')
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import queriedDocsInterdeptRequest from '@/components/request/queriedDocs/queriedDocsInterdeptRequest'
import { getterTypes as requestGettersTypes } from '@/store/types/request'
const requestModuleName = 'request'

export default {
  name: 'RequestQueriedDocsPage',
  components: {
    queriedDocsInterdeptRequest
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        !vm.requestPagesActiveStatuses['queried-docs'].includes(
          vm.request.request.requestStatusId
        )
      ) {
        next({ name: 'request-id-main', params: { id: to.params.id } })
      }
    })
  },
  computed: {
    ...mapState({
      request: (state) => state.request,
      isRequestSaving: (state) => state.request.isRequestSaving
    }),

    ...mapGetters(['can', 'canAny']),
    ...mapGetters(requestModuleName, {
      requestPagesActiveStatuses:
        requestGettersTypes.GET_REQUEST_PAGES_ACTIVE_STATUSES
    }),
    requestId() {
      return this.$route.params.id
    },
    disabledEditing() {
      if (this.can('RL_GF_QUERY')) return false

      return true
    }
  }
}
</script>
<style lang="sass"></style>
