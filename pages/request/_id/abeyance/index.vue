<template lang="pug">
  div.request-abeyance
    el-row
      // Приостановление решения заявления
      abeyance-decision(:disabledEditing='disabledEditing || isRequestSaving')

</template>
<script>
import { mapState, mapGetters } from 'vuex'
import abeyanceDecision from '@/components/request/abeyance/abeyanceDecision'
import { getterTypes as requestGettersTypes } from '@/store/types/request'
const requestModuleName = 'request'

export default {
  name: 'RequestAbeyancePage',
  components: {
    abeyanceDecision
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        !vm.requestPagesActiveStatuses.abeyance.includes(
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
    disabledEditing() {
      if (this.canAny(['RL_GF_ABEYANCE_APPROVAL', 'RL_GF_ABEYANCE_PREPARING']))
        return false

      return true
    }
  }
}
</script>
<style lang="sass"></style>
