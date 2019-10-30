<template lang="pug">
  .error
    h1 Страница ошибки
    p Статус ошибки {{ this.$route.params.status }}
    div {{ error }}
</template>
<script>
export default {
  name: 'ErrorPage',
  layout: 'errorLayout',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="sass"></style>
