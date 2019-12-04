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
import decisionInfo from '@/components/request/decision/decisionInfo'
import decisionNotification from '@/components/request/decision/decisionNotification'
import documentsIssue from '@/components/request/decision/documentsIssue'

export default {
  name: 'RequestDecision',
  components: {
    decisionInfo,
    decisionNotification,
    documentsIssue
  },
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
