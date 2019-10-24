<template lang="pug">
  div.attached-docs
    el-row
      // Документы заявителя
      attached-docs-applicant-docs

</template>
<script>
import attachedDocsApplicantDocs from '@/components/request/attachedDocs/attachedDocsApplicantDocs'
export default {
  name: 'RequestAttachedDocsPage',
  components: {
    attachedDocsApplicantDocs
  },
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
