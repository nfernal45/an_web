<template>
  <div class="page">
    <div class="container">
      <table id="toggled-element">
        <tbody>
          <tr style="float: left;">
            <td>
              <p class="info_msg" name="Diagnostics">Инициализация КриптоПро</p>
              <div class="edge">
                <div id="csp_msg" style="text-align:left;">
                  <p>
                    <span class="dot red" id="ExtensionEnabledImg"></span>
                    <span id="ExtensionEnabledTxt">
                      Расширение не загружено
                    </span>
                    <span id="ExtensionSolution"></span>
                  </p>
                  <p>
                    <span class="dot" id="PluginEnabledImg"></span>
                    <span id="PluginEnabledTxt">
                      Плагин: ожидание загрузки расширения
                    </span>
                    <span id="PluginSolution"></span>
                  </p>
                  <p>
                    <span class="dot" id="CspEnabledImg"></span>
                    <span id="CspEnabledTxt">
                      КриптоПро CSP: ожидание загрузки плагина
                    </span>
                    <span id="CspSolution"></span>
                  </p>
                  <p>
                    <span class="dot" id="ObjectsLoadedImg"></span>
                    <span id="ObjectsLoadedTxt">
                      Объекты плагина: ожидание загрузки провайдера
                    </span>
                    <span id="ObjectsSolution"></span>
                  </p>
                  <p v-if="localErrorMessage">
                    <span class="dot red" id="ObjectsLoadedImg"></span>
                    <span id="ObjectsLoadedTxt">
                      Ошибка: {{ localErrorMessage }}
                    </span>
                    <span id="ObjectsSolution"></span>
                  </p>
                  <p v-if="signErrorMessage">
                    <span class="dot red" id="ObjectsLoadedImg"></span>
                    <span id="ObjectsLoadedTxt">
                      Ошибка: {{ signErrorMessage }}
                    </span>
                    <span id="ObjectsSolution"></span>
                  </p>
                  <div class="edge"></div>
                  <ul v-show="false" class="descr">
                    <li class="descr" id="PlugInVersionTxt" lang="ru"></li>
                    <li class="descr" id="CSPVersionTxt" lang="ru"></li>
                    <li class="descr" id="CSPNameTxt" lang="ru"></li>
                    <li class="descr" id="Platform"></li>
                    <li class="descr" id="UserAgent"></li>
                  </ul>
                </div>
                <div v-show="false" id="boxdiv" style="display:none">
                  <span id="errorarea">
                    У вас отсутствуют личные сертификаты. Вы можете
                    <a href="#" onClick="Common_RetrieveCertificate();">
                      получить
                    </a>
                    сертификат от тестового УЦ, предварительно установив
                    <a
                      href="https://testgost2012.cryptopro.ru/certsrv/certnew.cer?ReqID=CACert&Renewal=1&Enc=bin"
                      >корневой сертификат тестового УЦ
                    </a>
                    в доверенные.
                  </span>
                </div>
              </div>
              <p class="info_msg" id="CertificateTitle" name="CertificateTitle">
                Выберите сертификат:
              </p>
              <div
                class="edge item_border"
                id="CertListBoxToHide"
                name="CertListBoxToHide"
              >
                <select
                  id="CertListBox"
                  v-model="certIndex"
                  size="8"
                  name="CertListBox"
                  class="user_input"
                >
                </select>
              </div>
              <p
                v-if="false"
                class="info_msg"
                id="DataToSign"
                name="DataToSign"
                style="display:none"
              >
                Данные для подписи:
              </p>
              <div
                v-if="false"
                id="DataToSignItemBorder"
                class="edge item_border"
                name="DataToSignItemBorder"
                style="display:none"
              >
                <textarea
                  v-if="false"
                  id="DataToSignTxtBox"
                  name="DataToSignTxtBox"
                  class="user_input"
                >
                </textarea>
              </div>
              <div v-if="false" class="edge">
                <button
                  id="SignBtn"
                  @click="testSign()"
                  type="button"
                  class="button"
                  style="display:none"
                  name="SignData"
                >
                  Подписать
                </button>
              </div>
              <div
                v-if="false"
                id="cert_info"
                class="edge"
                name="CertInfo"
                style="display:none"
              >
                <h2>Информация о сертификате</h2>
                <p class="info_field" id="subject"></p>
                <p class="info_field" id="issuer"></p>
                <p class="info_field" id="from"></p>
                <p class="info_field" id="till"></p>
                <p class="info_field" id="provname"></p>
                <p class="info_field" id="privateKeyLink"></p>
                <p class="info_field" id="algorithm"></p>
                <p class="info_field" id="status"></p>
                <p class="info_field" id="location"></p>
              </div>
              <p
                v-show="false"
                class="info_msg"
                id="SignatureTitle"
                name="SignatureTitle"
                style="display:none"
              >
                Подпись:
              </p>
              <div
                class="edge item_border"
                id="SignatureTitleItemBorder"
                name="SignatureTitleItemBorder"
                style="display:none"
              >
                <textarea
                  id="SignatureTxtBox"
                  readonly
                  class="user_input mono"
                  style="font-size:9pt;height:600px;"
                >
                </textarea>
                <script language="javascript">
                  var txtDataToSign = 'Hello World'
                  document.getElementById(
                    'DataToSignTxtBox'
                  ).innerHTML = txtDataToSign
                  document.getElementById('SignatureTxtBox').innerHTML = ''
                </script>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
      isLoadedSignScripts: false,
      certIndex: null,
      localErrorMessage: null,
    }
  },
  watch: {
    certIndex() {
      const cert = this.getCertificate(this.certIndex)
      this.$emit("selectCertificate", cert)
    }
  },
  mounted() {
    if (!this.isLoadedSignScripts) {
      this.addScripts()
      this.isLoadedSignScripts = true
      this.certIndex = null
      this.localErrorMessage = null
    }
  },
  beforeDestroy() {
    this.removeScripts()
    this.isLoadedSignScripts = false
  },
  methods: {
    addScripts() {
      const promiseData = [];
      promiseData.push(this.loadSignScript('es6-promise', 'es6-promise.min.js'))
      promiseData.push(this.loadSignScript('ie_eventlistner_polyfill', 'ie_eventlistner_polyfill.js'))
      promiseData.push(this.loadSignScript('lights', 'lights.js'))
      promiseData.push(this.loadSignScript('cadesplugin_api', 'cadesplugin_api.js'))
      promiseData.push(this.loadSignScript('Code', 'Code.js'))
      promiseData.push(this.loadSignScript('highlight', 'highlight.js'))
      // Грузится в '/js/Code.js'
      // promiseData.push(this.loadScript('async_code', 'async_code.js'))
      promiseData.push(this.loadSignScript('load_extension', 'load_extension.js'))

      const currentComponent = this
      Promise.all(promiseData).then(function() {
        currentComponent.initCadesPlugin()
      }).catch(function(gfgData) {
        currentComponent.localErrorMessage = gfgData.toString()
      });
    },
    initCadesPlugin() {
      document.loadCades()
      document.loadExtensions()
    },
    removeScripts() {
      this.removeScript('es6-promise')
      this.removeScript('ie_eventlistner_polyfill')
      this.removeScript('lights')
      this.removeScript('cadesplugin_api')
      this.removeScript('Code')
      this.removeScript('highlight')
      this.removeScript('async_code')
      this.removeScript('load_extension')
      window.cadesplugin = null;
    },
    removeScript(id) {
      const script = document.getElementById(id)
      // eslint-disable-next-line no-unused-expressions
      if (script) script.parentNode?.removeChild(script)
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
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      });
    },
    getCertificate(certIndex) {
      // eslint-disable-next-line no-undef
      return global_selectbox_container[certIndex]
    },
  }
}
</script>
<style scoped>
@import '~/components/request/queriedDocs/queriedDocCertLoader/css/certLoader.css';
</style>
