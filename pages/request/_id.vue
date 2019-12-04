<template lang="pug">
  div
    nuxt-child
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { actionTypes as requestActionTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'RequestPage',
  beforeRouteLeave(to, from, next) {
    this.resetRequest()
    next()
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request
    })
  },
  mounted() {
    this.redirectToRegistry()
    this.fetchRequestHandler()
  },
  methods: {
    ...mapActions(moduleName, {
      fetchRequestById: requestActionTypes.FETCH_REQUEST,
      resetRequest: requestActionTypes.RESET_REQUEST,
      fetchRequestStatuses: requestActionTypes.FETCH_REQUEST_STATUSES
    }),
    redirectToRegistry() {
      if (this.$route.name === 'request-id') this.$router.replace('/registry')
    },
    async fetchRequestHandler() {
      if (this.request.requestId) {
        this.fetchRequestStatuses()
      } else {
        await this.fetchRequestById(this.$route.params.id)
      }
    }
  }
}
</script>

<style lang="sass"></style>
