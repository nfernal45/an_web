<template lang="pug">
  div
    h1 Прикрепленные документы заявления {{ appealId }}
</template>
<script>
export default {
  name: 'AppealAttachedDocsPage',
  computed: {
    appealId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
