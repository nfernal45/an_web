<template lang="pug">
  div
    el-row(:gutter='20')
      el-col(:span='10')
        el-button(
          :loading='isChedFormLoading'
          type='primary'
          @click='openUform'
        ) Добавить документ

    el-dialog(
      :visible='isChedFormVisible'
      width='786px'
      :lock-scroll='false'
      :close-on-click-modal='false'
      @close='closeUform'
    )
      div(style='position:relative;display:inline-block;')
        div(id='uform-container')
   
</template>
<script>
export default {
  name: 'ChedForm',
  props: {
    chedSettings: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isChedFormLoading: false,
      isChedFormVisible: false,
      uFormInstance: null
    }
  },
  async mounted() {
    this.isChedFormLoading = true
    await this.addChedScript()
    this.isChedFormLoading = false
  },
  beforeDestroy() {
    this.removeChedScript()
    this.destroyUform()
  },
  methods: {
    openUform() {
      if (!this.uFormInstance) {
        this.isChedFormLoading = true
        this.createUform()
      } else {
        this.isChedFormVisible = true
      }
    },

    onFormLoad() {
      this.isChedFormVisible = true
      this.isChedFormLoading = false
    },

    onUpload(data) {
      // this.closeUform()
      this.$notify.success({
        title: 'Загружено',
        message: 'Файл загружен'
      })
      this.$emit('upload', data)
    },

    onFormError(error) {
      this.isChedFormVisible = false
      this.isChedFormLoading = false
      this.$notify.error({
        title: 'Ошибка',
        message: error.template
      })
    },

    closeUform() {
      this.isChedFormVisible = false
      this.destroyUform()
    },

    createUform() {
      // const docType = this.getDocTypeForChed()
      const config = {
        domain: this.chedSettings.RL_CHED_FORM_URL,
        domContainerId: 'uform-container',
        channel: this.chedSettings.RL_CHED_FORM_CHANNEL,
        service: this.chedSettings.RL_CHED_FORM_SERVICE,
        callbacks: {
          onFormLoad: this.onFormLoad(),
          onUpload: (data) => {
            this.onUpload(data)
          },
          onError: (error) => {
            this.onFormError(error)
          }
        }
        // bindings: {
        // [docType]: () => {}
        // }
      }
      // eslint-disable-next-line no-undef
      this.uFormInstance = createUForm(config)
    },

    destroyUform() {
      if (this.uFormInstance) {
        this.uFormInstance.remove()
        this.uFormInstance = null
      }
    },

    async addChedScript() {
      const tag = document.createElement('script')
      tag.src = this.chedSettings.RL_CHED_SCRIPT_URL
      tag.async = true
      tag.id = 'ched-script'
      tag.onload = () => {
        // this.resolve()
      }
      const firstScriptTag = await document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    },

    removeChedScript() {
      const chedScript = document.getElementById('ched-script')
      if (chedScript) chedScript.parentNode.removeChild(chedScript)
    }
  }
}
</script>
<style lang="sass"></style>
