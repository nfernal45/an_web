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
      delivery-documents

</template>
<script>
import decisionInfo from '@/components/request/decision/decisionInfo'
import decisionNotification from '@/components/request/decision/decisionNotification'
import deliveryDocuments from '@/components/request/decision/deliveryDocuments'

export default {
  name: 'RequestDecision',
  components: {
    decisionInfo,
    decisionNotification,
    deliveryDocuments
  },
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
