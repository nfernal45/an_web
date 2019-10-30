<template lang="pug">
  div
    el-row(:gutter='20')
      el-col(:span='10')
        el-button(
          :loading='isChedFormLoading'
          type='primary'
          @click='openUform') Добавить документ
    el-row.mt-10(:gutter='20' v-show="isChedFormVisible")
      el-col
        div(style='position:relative;display:inline-block;')
          div(id='uform-container')
          el-button(type='primary' style='position:absolute;top:10px;right:10px' @click='closeUform') Закрыть
   
</template>
<script>
import fetchChedSettings from '@/services/api/ched/fetchChedSettings'
export default {
  name: 'ChedForm',
  data() {
    return {
      chedSettings: {},
      isChedFormLoading: false,
      isChedFormVisible: false,
      uFormInstance: null,
      settingList: [
        'RL_CHED_FORM_CHANNEL',
        'RL_CHED_FORM_DOMAIN',
        'RL_CHED_FORM_DOMAIN_BR',
        'RL_CHED_FORM_SERVICE',
        'RL_CHED_FORM_URL',
        'RL_CHED_GET_URL',
        'RL_CHED_MZHI_OS',
        'RL_CHED_OS',
        'RL_CHED_SCRIPT_URL'
      ]
    }
  },
  async mounted() {
    this.isChedFormLoading = true
    await this.fetchChedSettings()
    this.addChedScript()
    this.isChedFormLoading = false
  },
  beforeDestroy() {
    this.removeChedScript()
    this.destroyUform()
  },
  methods: {
    async openUform() {
      if (!this.uFormInstance) {
        this.isChedFormLoading = true
        await this.createUform()
        this.isChedFormVisible = true
        this.isChedFormLoading = false
      } else {
        this.isChedFormVisible = true
      }
    },

    closeUform() {
      this.isChedFormVisible = false
    },

    createUform() {
      // const docType = this.getDocTypeForChed()
      return new Promise((resolve, reject) => {
        const config = {
          domain: this.chedSettings.RL_CHED_FORM_URL,
          domContainerId: 'uform-container',
          channel: this.chedSettings.RL_CHED_FORM_CHANNEL,
          service: this.chedSettings.RL_CHED_FORM_SERVICE,
          callbacks: {
            onFormLoad: () => {
              resolve()
            },
            onUpload: (data) => {
              this.$emit('upload', data)
            },
            onError: (error) => {
              reject(error)
            }
          }
          // bindings: {
          // [docType]: () => {}
          // }
        }
        // eslint-disable-next-line no-undef
        this.uFormInstance = createUForm(config)
      })
    },

    destroyUform() {
      this.uFormInstance.remove()
      this.uFormInstance = null
    },

    addChedScript() {
      const tag = document.createElement('script')
      tag.src = this.chedSettings.RL_CHED_SCRIPT_URL
      tag.async = true
      tag.id = 'ched-script'
      tag.onload = () => {
        // this.resolve()
      }
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    },

    removeChedScript() {
      const chedScript = document.getElementById('ched-script')
      chedScript.parentNode.removeChild(chedScript)
    },

    async fetchChedSettings() {
      const chedSettings = await fetchChedSettings({
        axiosModule: this.$axios,
        query: this.settingList
      })

      this.chedSettings = chedSettings.reduce((result, item, index, array) => {
        result[item.settingId] = item.settingValString
        return result
      }, {})
    }
  }
}
</script>
<style lang="sass"></style>
