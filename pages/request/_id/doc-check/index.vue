<template lang="pug">
  div
    h1 Проверка документов для заявления {{ requestId }}
</template>
<script>
export default {
  name: 'RequestDocCheckPage',
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
