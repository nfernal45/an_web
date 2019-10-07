<template lang="pug">
  div
    h1  Основная вкладка заявления {{ appealId }}
    ul
      li(v-for="item in content")
        span {{ item.title }}
</template>

<script>
export default {
  name: 'AppealMainPage',
  computed: {
    appealId() {
      return this.$route.params.id
    }
  },
  asyncData(context) {
    return context.$axios
      .$get('https://jsonplaceholder.typicode.com/posts/')
      .then((data) => ({ content: data }))
  }
}
</script>

<style></style>
