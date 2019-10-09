<template lang="pug">
  div
    h1 Межведомственные запросы для заявления {{ appealId }}
</template>
<script>
export default {
  name: 'AppealQueriedDocsPage',
  computed: {
    appealId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
