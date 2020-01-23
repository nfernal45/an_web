<template lang="pug">
  div
    nuxt-child(v-if='isRequestReady')
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { actionTypes as requestActionTypes } from '@/store/types/request'
import { actionTypes as rederencesActions } from '@/store/types/references'

const requestModuleName = 'request'
const referencesModuleName = 'references'

export default {
  name: 'RequestPage',
  beforeRouteLeave(to, from, next) {
    this.resetRequest()
    next()
  },
  data() {
    return {
      isRequestReady: false
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request
    })
  },
  async mounted() {
    await this.fetchRequestStatusesOptions()
    this.redirectToRegistry()
    this.fetchRequestHandler()
  },
  methods: {
    ...mapActions(requestModuleName, {
      fetchRequestById: requestActionTypes.FETCH_REQUEST,
      resetRequest: requestActionTypes.RESET_REQUEST,
      fetchRequestStatuses: requestActionTypes.FETCH_REQUEST_STATUSES
    }),
    ...mapActions(referencesModuleName, {
      fetchRequestStatusesOptions:
        rederencesActions.FETCH_REQUEST_STATUSES_OPTIONS
    }),
    redirectToRegistry() {
      if (this.$route.name === 'request-id') this.$router.replace('/registry')
    },
    async fetchRequestHandler() {
      if (this.request.requestId) {
        this.fetchRequestStatuses()
      } else {
        try {
          await this.fetchRequestById(this.$route.params.id)
          this.isRequestReady = true
        } catch {
          this.isRequestReady = true
        }
      }
    }
  }
}
</script>

<style lang="sass"></style>
