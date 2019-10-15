<template lang="pug">
  div.appeal-abeyance

    // Приостановление решения заявления
    abeyance-decision-of-the-application
    
</template>
<script>
import abeyanceDecisionOfTheApplication from '@/components/appeal/abeyance/abeyanceDecisionOfTheApplication'
export default {
  name: 'AppealabeyancePage',
  components: {
    abeyanceDecisionOfTheApplication
  }
}
</script>
<style lang="sass"></style>
