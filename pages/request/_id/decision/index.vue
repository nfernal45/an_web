<template lang="pug">
  div.dicision
    el-row.mb-20
      // Решение по заявлению
      decision-info

    el-row.mb-20
      // Уведомление
      decision-notification

    el-row.mb-20
      // Выдача документов
      documents-issue
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

    ...mapGetters(requestModuleName, {
      requestPagesActiveStatuses:
        requestGettersTypes.GET_REQUEST_PAGES_ACTIVE_STATUSES
    }),

    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
