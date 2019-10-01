<template lang="pug">
  div
    h1 Решение по заявлению {{ appealId }}
</template>
<script>
export default {
  name: 'AppealDecision',
  computed: {
    appealId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
