<template lang="pug">
  div.request-abeyance

    // Приостановление решения заявления
    abeyance-decision
    
</template>
<script>
import abeyanceDecision from '@/components/request/abeyance/abeyanceDecision'
export default {
  name: 'RequestabeyancePage',
  components: {
    abeyanceDecision
  }
}
</script>
<style lang="sass"></style>
