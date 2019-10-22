<template lang="pug">
  div
    nuxt-child
</template>

<script>
import { mapActions } from 'vuex'
import { actionTypes as requestActionTypes } from '@/store/types/request'
// TODO: реализовать принудительный редирект на main
const moduleName = 'request'
export default {
  name: 'RequestPage',
  mounted() {
    this.fetchRequestById(this.$route.params.id)
  },
  destroyed() {
    this.resetRequest()
  },
  methods: {
    ...mapActions(moduleName, {
      fetchRequestById: requestActionTypes.FETCH_REQUEST,
      resetRequest: requestActionTypes.RESET_REQUEST
    })
  }
}
</script>

<style lang="sass"></style>
