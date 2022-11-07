<template lang="pug">
  form-block(title='Запрос документов в базовом регистре для проверки предоставленных сведений')
    template(slot='content')
      el-form(
        size='small' 
        label-position='top'
        :disabled='disabledEditing'
      )
        el-row.mb-10
          el-col
            el-popover(placement='top'
                       width='430'
                       v-model='isAddDocumentPopoverVisible')
              el-form-item(label='Тип документа')
                el-select(v-model='additionalDocumentTypeId' 
                          size='small'
                          filterable
                          style='width: 400px')
                  el-option(v-for='item in computedRerDocTypes'
                            :key='item.typeId'
                            :value='item.typeId'
                            :label='item.typeName')
              div
                el-button(size='mini' 
                          type='primary' 
                           @click='addDocument(additionalDocumentTypeId)' 
                           :disabled='!additionalDocumentTypeId') Добавить
                el-button(size='mini' 
                          type='text'
                          @click='isAddDocumentPopoverVisible = false') Отмена
              el-button(slot='reference'
                        type='primary') Добавить документ

        el-row
          el-col
            el-card.mb-20(v-for='(doc, index) in computedQueriedDocs'
                    :key='doc.queryId'
                    shadow='hover')
              el-row.mb-10
                el-col
                  h4 {{ doc.docTypeName }}
              el-row(:gutter='20')
                el-col(:span='7')
                  el-form-item(label='Дата запроса')
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='doc.queryDate'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                      placeholder='Выберите дату'
                    )
                el-col(:span='7')
                  el-form-item(label='Дата ответа')
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='doc.receiveDate'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                      placeholder='Выберите дату'
                    )
                el-col(:span='6' v-show='doc.refAttachedDoc && doc.refAttachedDoc.docFileName')
                  el-form-item(label=' ')
                      a.file-link(:href='doc.refAttachedDoc && doc.refAttachedDoc.fileLink')
                        i.el-icon-document 
                        span {{ doc.refAttachedDoc && doc.refAttachedDoc.docFileName }}
              el-row
                el-col(:span='14')
                  el-form-item(label='Примечание')
                    el-input(
                      v-model='doc.comments'
                      @input='setQueriedDocPropValue(doc.queryId, "comments", $event)'
                    )
              el-row
                el-col
                  el-button(type='primary'
                            :ref='`etp${doc.queryId}`'
                            v-show='!doc.queryDate'
                            @click='sendToEtp(doc, index)') Запросить документ в БР

        el-dialog(:visible.sync='isRequiredInterParamsDialogVisible'
                  :close-on-click-modal='false'
                  :append-to-body='true'
                  title="Дополнительные параметры")
          el-row(v-if='requiredInterParamsData.length > 0')
            el-col
              h6.mb-10 Укажите параметры запроса:
          el-row
            el-col(:span='16')
              el-form-item(v-for='item in requiredInterParamsData'
                          :key='item && item.paramId'
                          :label='item && item.paramCaption')
                div(v-if='isInfInExplNumPermInterParam(item)')
                  el-input.mb-10(v-model='item.stringValue'
                    v-mask="'##.##.####'"
                    :placeholder="'XX.XX.XXXX'"
                    style='border-color: yellow !important')
                  transition(name='fade')
                    div(v-show='item.isRequired === "Y" && !isValidDateInterParamValue(item.stringValue)'
                        style='position: absolute; color: tomato; font-size: 11px; transform: translateY(-15px)') Поле должно иметь формат XX.XX.XXXX
                div(v-else)
                  el-input.mb-10(v-model='item.stringValue'
                    style='border-color: yellow !important')
                  transition(name='fade')
                    div(v-show='item.isRequired === "Y" && !item.stringValue'
                      style='position: absolute; color: tomato; font-size: 11px; transform: translateY(-15px)') Обязательное поле должно быть заполнено
              div(v-if="isNeedSign(sendDocument)")
                queried-doc-cert-loader(
                  :disabledEditing='disabledEditing'
                  :signErrorMessage='signErrorMessage'
                  @selectCertificate="selectSignCertificate"
                )
              transition(v-if="!isNeedSign(sendDocument)" name='fade')
                el-button(@click='updateRequiredInterParamsAndSendToEtp'
                          :loading='isRequiredInterParamsLoading'
                          :disabled='isUpdateRequiredParamsButtonDisabled'
                          type='primary') Отправить запрос
              transition(v-else name='fade')
                el-button(@click='tryToSignAndSendDoc(sendDocument)'
                  :loading='isRequiredInterParamsLoading || isProcessSignAndSend'
                  :disabled='isUpdateRequiredParamsButtonDisabled || !signCertificate'
                  type='primary') Подписать и отправить
</template>
<script>
import { Loading } from 'element-ui'
import { mapState, mapActions, mapMutations } from 'vuex'
import { mutationTypes, actionTypes } from '@/store/types/request'
import queriedDocCertLoader from '@/components/request/queriedDocs/queriedDocCertLoader'
import fetchDocTypes from '@/services/api/references/fetchDocTypes'
import fetchRequiredInterParams from '@/services/api/request/fetchRequiredInterParams'
import updateRequiredInterParams from '@/services/api/request/updateRequiredInterParams'
import prepareAsurMessageForSign from '@/services/api/request/sign/prepareAsurMessageForSign'
import finishSign from '@/services/api/request/sign/finishSign'
import sendToEtp from '@/services/api/request/sendToEtp'
import fetchSettings from '@/services/api/settings/fetchSettings'
import { AUTH_USER_LOGIN_STORE_VALUE_NAME } from '@/store/auth/const'
import { INF_IN_EXPL_DATE_PERMISSION_INFER_PARAM_ID } from '@/services/api/const'

const moduleName = 'request'
export default {
  name: 'QueriedDocsInderdeptRequest',
  components: {
    queriedDocCertLoader
  },
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refDocTypes: [],
      isAddDocumentPopoverVisible: false,
      additionalDocumentTypeId: null,
      isRequiredInterParamsDialogVisible: false,
      isRequiredInterParamsLoading: false,
      requiredInterParamsData: [],
      chedSettings: {},
      chedSettingsLoaded: false,

      sendDocument: null,
      signCertificate: null,
      signErrorMessage: null,
      isProcessSignAndSend: false
    }
  },
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request,
      licenseeAttachedDocs: (state) => state.licenseeAttachedDocs
    }),
    computedQueriedDocs() {
      const queriedDocs =
        this.request &&
        this.request.gfQueriedDocsByRequestId &&
        this.request.gfQueriedDocsByRequestId.map((doc) => {
          const docTypeName =
            this.refDocTypes.length &&
            this.refDocTypes.find((item) => item.typeId === doc.docTypeId)
              .typeName
          return Object.assign({}, doc, { docTypeName })
        })

      const computedQueriedDocs =
        queriedDocs &&
        queriedDocs.map((doc) => {
          const attachedDoc = this.computedLicenseeAttachedDocs.find(
            (item) =>
              item.gfQueriedDocByQueryId &&
              item.gfQueriedDocByQueryId.queryId === doc.queryId
          )

          if (attachedDoc) doc.refAttachedDoc = attachedDoc

          return doc
        })

      if (
        typeof computedQueriedDocs !== 'undefined' &&
        'sort' in computedQueriedDocs
      ) {
        return computedQueriedDocs.sort(
          (prevDoc, nextDoc) => prevDoc.queryId - nextDoc.queryId
        )
      } else {
        return computedQueriedDocs
      }
    },
    computedRerDocTypes() {
      const currentRequest = this.request
      return this.refDocTypes.filter((item) => {
        if (
          item.interdepRequest === 'Y' &&
          item.isGf &&
          item.isActive === 'Y'
        ) {
          if (item.typeId === 83 || item.typeId === 45) {
            if (
              item.typeId === 83 &&
              currentRequest.explMosGorOkrug &&
              currentRequest.explMosGorOkrug.codeChar === 'Y'
            ) {
              return true
            }
            if (
              item.typeId === 45 &&
              (!currentRequest.explMosGorOkrug ||
                currentRequest.explMosGorOkrug.codeChar !== 'Y')
            ) {
              return true
            }
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      })
    },
    isUpdateRequiredParamsButtonDisabled() {
      const currentComponent = this
      return !this.requiredInterParamsData.every((item) => {
        if (item.isRequired === 'Y') {
          if (item.paramId === INF_IN_EXPL_DATE_PERMISSION_INFER_PARAM_ID) {
            return currentComponent.isValidDateInterParamValue(item.stringValue)
          } else {
            return !!item.stringValue
          }
        } else return true
      })
    },
    computedLicenseeAttachedDocs() {
      return this.licenseeAttachedDocs.map((doc) => {
        const documentId = doc.warehouseLink
        const groupId =
          doc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId.groupId
        const interdepRequest = doc.refDocTypeByDocTypeId.interdepRequest

        let fileLink

        if (groupId === 1 && !interdepRequest) {
          fileLink = `https://${this.chedSettings.RL_CHED_FORM_DOMAIN}/uform3.0/service/getcontent?os=${this.chedSettings.RL_CHED_MZHI_OS}&id=${documentId}`
        } else if (groupId === 1 && interdepRequest) {
          fileLink = `https://${this.chedSettings.RL_CHED_FORM_DOMAIN_BR}/uform3.0/service/getcontent?os=${this.chedSettings.RL_CHED_OS}&id=${documentId}`
        } else if (groupId === 2 && !interdepRequest) {
          fileLink = `https://${this.chedSettings.RL_CHED_FORM_DOMAIN}/uform3.0/service/getcontent?os=${this.chedSettings.RL_CHED_MZHI_OS}&id=${documentId}`
        }

        return Object.assign(doc, { fileLink })
      })
    }
  },
  mounted() {
    this.fetchDocTypes()
    this.fetchChedSettings()
  },
  methods: {
    ...mapActions(moduleName, {
      fetchRequest: actionTypes.FETCH_REQUEST,
      saveRequest: actionTypes.SAVE_REQUEST
    }),
    ...mapMutations(moduleName, {
      setProp: mutationTypes.SET_PROP,
      setRequestQueriedDocPropByQueryId:
        mutationTypes.SET_REQUEST_QUERIED_DOC_PROP_BY_QUERY_ID
    }),
    isValidDateInterParamValue(value) {
      if (!value) {
        return false
      } else {
        const regExp = new RegExp('^[0-9]{2}.[0-9]{2}.[0-9]{4}$')
        return regExp.test(value)
      }
    },
    isInfInExplNumPermInterParam(param) {
      return param.paramId === INF_IN_EXPL_DATE_PERMISSION_INFER_PARAM_ID
    },
    setQueriedDocPropValue(docQueryId, propName, propValue) {
      this.setRequestQueriedDocPropByQueryId({
        docQueryId,
        propName,
        propValue
      })
    },
    async sendToEtp(doc, index) {
      this.sendDocument = null
      this.signCertificate = null
      this.signErrorMessage = null

      const documentQueryId = doc.queryId
      const el = this.$refs[`etp${documentQueryId}`][0].$el

      const loading = Loading.service({
        target: el
      })

      // TODO: fetchRequiredInterParam return respones with data. If data is not empty, need display this for user.
      const requiredInterParamsResponse = await fetchRequiredInterParams({
        axiosModule: this.$axios,
        documentQueryId
      })

      if (requiredInterParamsResponse.length || this.isNeedSign(doc)) {
        this.sendDocument = doc
        this.requiredInterParamsData = requiredInterParamsResponse
        this.isRequiredInterParamsDialogVisible = true

        loading.close()
      } else {
        await sendToEtp({
          axiosModule: this.$axios,
          documentQueryId,
          userLogin: this.$auth.$storage.getState(
            AUTH_USER_LOGIN_STORE_VALUE_NAME
          )
        })

        await this.fetchRequest(this.request.requestId)

        loading.close()
      }
    },
    isNeedSign(doc) {
      return doc && doc.docTypeId === 92
    },
    async updateRequiredInterParams(requiredInterParamsData) {
      if (requiredInterParamsData && requiredInterParamsData.length !== 0) {
        await updateRequiredInterParams({
          axiosModule: this.$axios,
          entityArray: requiredInterParamsData
        })
      }
    },
    async updateRequiredInterParamsAndSendToEtp() {
      this.isRequiredInterParamsLoading = true
      try {
        await this.updateRequiredInterParams(this.requiredInterParamsData)
        await sendToEtp({
          axiosModule: this.$axios,
          documentQueryId: this.getDocumentQueryId(
            this.requiredInterParamsData,
            this.sendDocument
          ),
          userLogin: this.$auth.$storage.getState(
            AUTH_USER_LOGIN_STORE_VALUE_NAME
          )
        })
        await this.fetchRequest(this.request.requestId)
      } catch (e) {
        throw e
      } finally {
        this.isRequiredInterParamsDialogVisible = false
        this.isRequiredInterParamsLoading = false
      }
    },
    getDocumentQueryId(requiredInterParamsData, sendDocument) {
      if (
        this.requiredInterParamsData &&
        this.requiredInterParamsData.length !== 0
      ) {
        return this.requiredInterParamsData[0].queryId
      } else {
        return this.sendDocument.queryId
      }
    },
    async tryToSignAndSendDoc(doc) {
      this.isProcessSignAndSend = true
      try {
        await this.signAndSendDoc(doc)
        this.isRequiredInterParamsDialogVisible = false
      } catch (e) {
        this.signErrorMessage = e.message ? e.message : e.toString()
      } finally {
        this.isProcessSignAndSend = false
      }
    },
    async signAndSendDoc(doc, requiredInterParamsData) {
      await this.updateRequiredInterParams(requiredInterParamsData)
      const contentForSign = await this.getContentForSign(doc.queryId)
      // eslint-disable-next-line no-undef
      const signature = await signCadesBesAsync(
        this.signCertificate,
        contentForSign
      )
      await this.saveSignedContent(signature, contentForSign)
      await this.sendToEtpSignedContent(doc.queryId, contentForSign)
      await this.fetchRequest(this.request.requestId)
    },
    async getContentForSign(queryDocId) {
      // eslint-disable-next-line no-return-await
      return await prepareAsurMessageForSign({
        axiosModule: this.$axios,
        queriedDocId: queryDocId
      })
    },
    async saveSignedContent(signature, contentForSign) {
      await finishSign({
        axiosModule: this.$axios,
        etpOutMessageEntityId: contentForSign.etpOutMessageEntityId,
        appSign: signature.appSign,
        requestSign: signature.requestSign
      })
    },
    async sendToEtpSignedContent(documentQueryId, contentForSign) {
      await sendToEtp({
        axiosModule: this.$axios,
        documentQueryId,
        userLogin: this.$auth.$storage.getState(
          AUTH_USER_LOGIN_STORE_VALUE_NAME
        ),
        etpOutMessageEntityId: contentForSign.etpOutMessageEntityId
      })
    },
    selectSignCertificate(cert) {
      this.signCertificate = cert
    },
    async fetchDocTypes() {
      this.refDocTypes = await fetchDocTypes({ axiosModule: this.$axios })
    },
    addDocument(docTypeId) {
      const array = [...this.request.gfQueriedDocsByRequestId]
      const item = { docTypeId }

      array.push(item)

      this.setProp({ propName: 'gfQueriedDocsByRequestId', propValue: array })

      this.isAddDocumentPopoverVisible = false
      this.additionalDocumentTypeId = null

      this.saveRequest()
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
