<template lang="pug">
  div
    h1 Прикрепленные документы заявления {{ requestId }}
</template>
<script>
export default {
  name: 'RequestAttachedDocsPage',
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
