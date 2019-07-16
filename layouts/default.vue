<template>
  <div class="page">
    <Header/>
    <nuxt/>
  </div>
</template>

<script>
import Header from '~/components/Header/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
.page {
  padding-bottom: 48px;
}
</style>

