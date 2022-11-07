<template lang="pug">
  el-form(
    size='small'
    label-position='top'
    :disabled='disabledEditing'
  )
    el-row
      el-col
        h6.mb-10 Инициализация КриптоПро
    el-row
      el-col {{ extensionLoadText }}
    el-row
      el-col {{ pluginLoadText }}
    el-row
      el-col {{ providerLoadText }}
    el-row.mb-10
      el-col {{ certificatesLoadText }}
    el-row.mb-10(style="color: red;")
      el-col {{ localErrorMessage }}
    el-row.mb-10(style="color: red;")
      el-col {{ signErrorMessage }}
    el-row.mb-10(v-loading='!isInitEnded')
      el-col
        el-form-item(label='Сертификат' di)
          el-select(v-model='certIndex'
            :disabled='certificates.length === 0'
            size='small'
            style='width: 600px')
            el-option(v-for='(item, index) in certificates'
              :key='item.thumbprint'
              :value='index'
              :label='item.text')
</template>
<script lang="js">

export default {
  name: 'QueriedDocsInderdeptSign',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    },
    signErrorMessage: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      extensionLoadText: 'Расширение не загружено',
      pluginLoadText: 'Плагин не загружен',
      providerLoadText: 'Криптопровайдер не загружен',
      certificatesLoadText: 'Сертификаты не загружены',
      certIndex: null,
      certificates: [],
      isLoadedSignScripts: false,
      localErrorMessage: null,
      isInitEnded: true
    }
  },
  watch: {
    certIndex(index) {
      this.$emit("selectCertificate", this.certificates[index].cert)
    },
  },
  mounted() {
    if (!this.isLoadedSignScripts) {
      this.addScripts()
      this.isLoadedSignScripts = true
      this.certIndex = null
      this.certificates = []
    }
  },
  beforeDestroy() {
    this.removeScripts()
    this.isLoadedSignScripts = false
  },
  methods: {
    addScripts() {
      const promiseData = [];
      promiseData.push(this.loadSignScript('cadesplugin_api', 'cadesplugin_api.js'))
      promiseData.push(this.loadSignScript('fors_cades', 'fors_cades.js'))

      const currentComponent = this
      Promise.all(promiseData)
        .then(function() {
          currentComponent.initCadesPlugin()
        }).catch(function(gfgData) {
          currentComponent.localErrorMessage = gfgData.toString()
        });
    },
    async initCadesPlugin() {
      this.isInitEnded = false
      try {
        const currentComponent = this
        window.cadesplugin_extension_loaded_callback = function() {
          currentComponent.extensionLoadText = 'Расширение загружено'
        }
        document.loadCades()
        // eslint-disable-next-line no-undef
        await cadesplugin
        this.pluginLoadText = 'Плагин загружен'

        // eslint-disable-next-line no-undef
        await checkPluginLoadedAsync()
        this.providerLoadText = 'Криптопровайдер загружен'

        this.certificatesLoadText = 'Идёт загрузка сертификатов'
        // eslint-disable-next-line no-undef
        this.certificates = await loadCertificatesAsync()
        this.certificatesLoadText = 'Сертификаты загружены'
      } catch (e) {
        this.localErrorMessage = e.toString()
      } finally {
        this.isInitEnded = true
      }
    },
    removeScripts() {
      this.removeScript('cadesplugin_api')
      this.removeScript('fors_cades')
      window.cadesplugin = null;
    },
    removeScript(id) {
      const script = document.getElementById(id)
      // eslint-disable-next-line no-unused-expressions
      if (script) script.parentNode.removeChild(script)
    },
    loadSignScript(id, file) {
      return new Promise(function(resolve, reject) {
        const tag = document.createElement('script')
        tag.src = '/management/js/' + file
        tag.async = false
        tag.id = id
        tag.onload = () => {
          resolve();
        };
        tag.onerror = (error) => {
          reject(error);
        };
        const firstScriptTag = document.getElementsByTagName('script')[0]
        // eslint-disable-next-line no-unused-expressions
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      });
    },
    getCertificate(certIndex) {
      // eslint-disable-next-line no-undef
      return global_selectbox_container[certIndex]
    },
  }
}
</script>
<style lang="sass"></style>
