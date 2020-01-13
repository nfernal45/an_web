<template lang="pug">
  div.request-abeyance
    el-row
      // Приостановление решения заявления
      abeyance-decision
    
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import abeyanceDecision from '@/components/request/abeyance/abeyanceDecision'
import {
  actionTypes as requestActionTypes,
  getterTypes as requestGettersTypes
} from '@/store/types/request'
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
      request: (state) => state.request
    }),

    ...mapGetters(requestModuleName, {
      requestPagesActiveStatuses:
        requestGettersTypes.GET_REQUEST_PAGES_ACTIVE_STATUSES
    }),

    isAbeaynceExist() {
      return (
        this.request.gfAbeyancesByRequestId &&
        !!this.request.gfAbeyancesByRequestId.length
      )
    }
  },
  methods: {
    ...mapActions(requestModuleName, {
      createAbeyance: requestActionTypes.CREATE_ABEYANCE
    })
  }
}
</script>
<style lang="sass"></style>
