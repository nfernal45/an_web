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
                    el-input(v-model='doc.comments')
              el-row
                el-col
                  el-button(type='primary'
                            :ref='`etp${doc.queryId}`'
                            v-show='!doc.queryDate'
                            @click='sendToEtp(doc.queryId, index)') Запросить документ в БР

        el-dialog(:visible.sync='isRequiredInterParamsDialogVisible'
                  :close-on-click-modal='false'
                  :append-to-body='true'
                  title="Дополнительные параметры")
          el-row
            el-col
              h6.mb-10 Укажите параметры запроса:
          el-row
            el-col(:span='16')
                el-form-item(v-for='item in requiredInterParamsData'
                            :key='item && item.paramId'
                            :label='item && item.paramCaption')
                  el-input.mb-10(v-model='item.stringValue'
                                 style='border-color: yellow !important')
                  transition(name='fade')
                    div(v-show='item.isRequired === "Y" && !item.stringValue'
                        style='position: absolute; color: tomato; font-size: 11px; transform: translateY(-15px)') Обязательное поле должно быть заполнено
                transition(name='fade')
                  el-button(@click='updateRequiredInterParams'
                            :loading='isRequiredInterParamsLoading'
                            :disabled='isUpdateRequiredParamsButtonDisabled'
                            type='primary') Отправить запрос
     

        
          

</template>
<script>
import { Loading } from 'element-ui'
import { mapState, mapActions, mapMutations } from 'vuex'
import { mutationTypes, actionTypes } from '@/store/types/request'
import fetchDocTypes from '@/services/api/references/fetchDocTypes'
import fetchRequiredInterParams from '@/services/api/request/fetchRequiredInterParams'
import updateRequiredInterParams from '@/services/api/request/updateRequiredInterParams'
import sendToEtp from '@/services/api/request/sendToEtp'
import fetchSettings from '@/services/api/settings/fetchSettings'

const moduleName = 'request'
export default {
  name: 'QueriedDocsInderdeptRequest',
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
      chedSettingsLoaded: false
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

      return computedQueriedDocs.sort(
        (prevDoc, nextDoc) => prevDoc.queryId - nextDoc.queryId
      )
    },
    computedRerDocTypes() {
      return this.refDocTypes.filter(
        (item) =>
          item.interdepRequest === 'Y' && item.isGf && item.isActive === 'Y'
      )
    },
    isUpdateRequiredParamsButtonDisabled() {
      return !this.requiredInterParamsData.every((item) => {
        if (item.isRequired === 'Y') return !!item.stringValue
        else return true
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
      setProp: mutationTypes.SET_PROP
    }),
    async sendToEtp(documentQueryId, index) {
      const el = this.$refs[`etp${documentQueryId}`][0].$el

      const loading = Loading.service({
        target: el
      })

      // TODO: fetchRequiredInterParam return respones with data. If data is not empty, need display this for user.
      const requiredInterParamsResponse = await fetchRequiredInterParams({
        axiosModule: this.$axios,
        documentQueryId
      })

      if (!requiredInterParamsResponse.length) {
        await sendToEtp({
          axiosModule: this.$axios,
          documentQueryId
        })

        await this.fetchRequest(this.request.requestId)

        loading.close()
      } else {
        this.requiredInterParamsData = requiredInterParamsResponse
        this.isRequiredInterParamsDialogVisible = true

        loading.close()
      }
    },
    async updateRequiredInterParams() {
      const array = this.requiredInterParamsData
      const documentQueryId = array[0].queryId

      this.isRequiredInterParamsLoading = true

      await updateRequiredInterParams({
        axiosModule: this.$axios,
        entityArray: array
      })

      await sendToEtp({
        axiosModule: this.$axios,
        documentQueryId
      })

      await this.fetchRequest(this.request.requestId)

      this.isRequiredInterParamsDialogVisible = false
      this.isRequiredInterParamsLoading = false
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
