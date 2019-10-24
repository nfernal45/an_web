<template lang="pug">
  div
    h1 Решение по заявлению {{ requestId }}
</template>
<script>
export default {
  name: 'RequestDecision',
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
