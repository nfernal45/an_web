<template lang="pug">
  div.appeal-abeyance

    // Приостановление решения заявления
    abeyance-decision
    
</template>
<script>
import abeyanceDecision from '@/components/appeal/abeyance/abeyanceDecision'
export default {
  name: 'AppealabeyancePage',
  components: {
    abeyanceDecision
  }
}
</script>
<style lang="sass"></style>
