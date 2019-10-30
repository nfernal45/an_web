<template lang="pug">
  div.attached-docs
    el-row
      // Документы заявителя
      attached-docs-applicant-docs

      attached-docs-mzhi-docs

</template>
<script>
import attachedDocsApplicantDocs from '@/components/request/attachedDocs/attachedDocsApplicantDocs'
import attachedDocsMzhiDocs from '@/components/request/attachedDocs/attachedDocsMzhiDocs'
export default {
  name: 'RequestAttachedDocsPage',
  components: {
    attachedDocsApplicantDocs,
    attachedDocsMzhiDocs
  },
  computed: {
    requestId() {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="sass"></style>
