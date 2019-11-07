<template lang="pug">
  div.attached-docs
    el-row
      // Документы заявителя
      attached-docs-licensee-docs(:refDocTypes='refDocTypes')

      attached-docs-mzhi-docs(:refDocTypes='refDocTypes')

</template>
<script>
import fetchDocTypes from '@/services/api/references/fetchDocTypes'
import attachedDocsLicenseeDocs from '@/components/request/attachedDocs/attachedDocsLicenseeDocs'
import attachedDocsMzhiDocs from '@/components/request/attachedDocs/attachedDocsMzhiDocs'
export default {
  name: 'RequestAttachedDocsPage',
  components: {
    attachedDocsLicenseeDocs,
    attachedDocsMzhiDocs
  },
  data() {
    return {
      refDocTypes: []
    }
  },
  computed: {
    requestId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.fetchDocTypes()
  },
  methods: {
    async fetchDocTypes() {
      this.refDocTypes = await fetchDocTypes({ axiosModule: this.$axios })
    }
  }
}
</script>
<style lang="sass"></style>
