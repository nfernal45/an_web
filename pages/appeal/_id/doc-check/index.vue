<template lang="pug">
  div
    h1 Проверка документов для заявления {{ appealId }}
</template>
<script>
export default {
  name: 'AppealDocCheckPage',
  computed: {
    appealId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
