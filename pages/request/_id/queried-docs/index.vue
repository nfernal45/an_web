<template lang="pug">
  div
    h1 Межведомственные запросы для заявления {{ requestId }}
</template>
<script>
export default {
  name: 'RequestQueriedDocsPage',
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
