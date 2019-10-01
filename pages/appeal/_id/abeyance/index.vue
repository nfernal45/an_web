<template lang="pug">
  div
    h1 Приостановление рассмотрения заявления {{ appealtId }}
</template>
<script>
export default {
  name: 'AppealAbeyancePage',
  computed: {
    appealtId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
