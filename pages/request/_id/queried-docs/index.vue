<template lang="pug">
  el-row
    // Межвед. запросы
    queried-docs-interdept-request
</template>
<script>
import queriedDocsInterdeptRequest from '@/components/request/queriedDocs/queriedDocsInterdeptRequest'
export default {
  name: 'RequestQueriedDocsPage',
  components: {
    queriedDocsInterdeptRequest
  },
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
