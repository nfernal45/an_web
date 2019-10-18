<template lang="pug">
  div
    nuxt-child
</template>

<script>
import { mapActions } from 'vuex'
import { actionTypes as appealActionTypes } from '@/store/types/appeal'
// TODO: реализовать принудительный редирект на main
const moduleName = 'appeal'
export default {
  name: 'AppealPage',
  mounted() {
    this.fetchAppealById(this.$route.params.id)
  },
  methods: {
    ...mapActions(moduleName, {
      fetchAppealById: appealActionTypes.FETCH_APPEAL
    })
  }
}
</script>

<style lang="sass"></style>
