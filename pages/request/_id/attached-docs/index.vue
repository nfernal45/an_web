<template lang="pug">
  div.attached-docs
    el-row
      // Документы заявителя
      attached-docs-licensee-docs(:refDocTypes='refDocTypes'
                                  :chedSettings='chedSettings'
                                  :chedSettingsLoaded='chedSettingsLoaded'
                                  :disabledEditing='disabledEditing')
      // Документы МЖИ
      attached-docs-mzhi-docs(:refDocTypes='refDocTypes'
                              :chedSettings='chedSettings'
                              :chedSettingsLoaded='chedSettingsLoaded'
                              :disabledEditing='!can("RL_GF_DOC_MZHI")')

      attached-docs-internal(:refDocTypes='refDocTypes'
                              :chedSettings='chedSettings'
                              :chedSettingsLoaded='chedSettingsLoaded'
                              :disabledEditing='!can("RL_GF_DOC_MZHI")')

</template>
<script>
import { mapGetters, mapState } from 'vuex'
import fetchDocTypes from '@/services/api/references/fetchDocTypes'
import attachedDocsLicenseeDocs from '@/components/request/attachedDocs/attachedDocsLicenseeDocs'
import attachedDocsMzhiDocs from '@/components/request/attachedDocs/attachedDocsMzhiDocs'
import attachedDocsInternal from '@/components/request/attachedDocs/attachedDocsInternal'
import fetchSettings from '@/services/api/settings/fetchSettings'

const requestModuleName = 'request'

export default {
  name: 'RequestAttachedDocsPage',
  components: {
    attachedDocsLicenseeDocs,
    attachedDocsMzhiDocs,
    attachedDocsInternal
  },
  data() {
    return {
      refDocTypes: [],
      chedSettings: {},
      chedSettingsLoaded: false
    }
  },
  computed: {
    ...mapGetters(['can', 'canAny']),
    ...mapState(requestModuleName, {
      request: (state) => state.request
    }),
    requestId() {
      return this.$route.params.id
    },
    // false - will not disable, true - will be disable
    disabledEditing() {
      if (this.can('RL_GF_REQUEST_CREATE')) return false

      return true
    }
  },
  mounted() {
    this.fetchDocTypes()
    this.fetchChedSettings()
  },
  methods: {
    async fetchDocTypes() {
      this.refDocTypes = await fetchDocTypes({ axiosModule: this.$axios })
    },
    async fetchChedSettings() {
      const chedDettingList = [
        'RL_CHED_FORM_CHANNEL',
        'RL_CHED_FORM_SERVICE',
        'RL_CHED_FORM_URL',
        'RL_CHED_GET_URL',
        'RL_CHED_SCRIPT_URL',
        'RL_CHED_FORM_DOMAIN',
        'RL_CHED_MZHI_OS',
        'RL_CHED_FORM_DOMAIN_BR',
        'RL_CHED_OS'
      ]

      const chedSettings = await fetchSettings({
        axiosModule: this.$axios,
        query: chedDettingList
      })

      this.chedSettings = chedSettings.reduce((result, item, index, array) => {
        result[item.settingId] = item.settingValString
        return result
      }, {})

      this.chedSettingsLoaded = true
    }
  }
}
</script>
<style lang="sass"></style>
