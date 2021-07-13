<template lang="pug">
  div.dicision
    el-row.mb-20
      // Решение по заявлению
      decision-info(:disabledEditing='disabledEditing')

    el-row.mb-20
      // Уведомление
      decision-notification(:disabledEditing='disabledEditing')

    el-row.mb-20
      // Выдача документов
      documents-issue(:disabledEditing='!can("RL_GF_DOC_ISSUE")')
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import decisionInfo from '@/components/request/decision/decisionInfo'
import decisionNotification from '@/components/request/decision/decisionNotification'
import documentsIssue from '@/components/request/decision/documentsIssue'
import { getterTypes as requestGettersTypes } from '@/store/types/request'
const requestModuleName = 'request'

export default {
  name: 'RequestDecision',
  components: {
    decisionInfo,
    decisionNotification,
    documentsIssue
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        !vm.requestPagesActiveStatuses.decision.includes(
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

    ...mapGetters(['can', 'canAny']),
    ...mapGetters(requestModuleName, {
      requestPagesActiveStatuses:
      requestGettersTypes.GET_REQUEST_PAGES_ACTIVE_STATUSES
    }),

    requestId() {
      return this.$route.params.id
    },
    disabledEditing() {
      if (
        this.canAny(
          ['RL_GF_DECISION_PREPARING', 'RL_GF_DECISION_APPROVAL'],
          this.request.request.requestStatusId
        )
      )
        return false

      return true
    }
  }
}
</script>
<style lang="sass"></style>
