<template lang="pug">
  h1  Основная вкладка заявления {{ appealId }}
</template>

<script>
export default {
  name: 'AppealMainPage',
  computed: {
    appealId() {
      return this.$route.params.id
    }
  }
}
</script>

<style></style>
