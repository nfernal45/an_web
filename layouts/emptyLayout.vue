<template lang="pug">
  nuxt(v-show="isReady")
</template>
<script>
export default {
  name: 'EmptyLayout',
  data() {
    return {
      isReady: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isReady = true
    })
  }
}
</script>
<style lang="sass"></style>
