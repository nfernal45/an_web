<template lang="pug">
  form-block.mb-10(title='Внутренние документы МЖИ')
    template(slot='content')
      el-form(
        size='small' 
        label-position='top'
        :disabled='disabledEditing'
      )
        el-row(:gutter='20')
          el-col(:span='10')
            el-popover(placement='top'
                       width='430'
                       v-model='isAddDocumentPopoverVisible'
                       @after-leave='additionalDocumentTypeId = null')
              el-form-item(label='Тип документа')
                el-select(v-model='additionalDocumentTypeId' 
                          filterable
                          size='small'
                          style='width: 400px')
                  el-option(v-for='item in licenseeDocTypesOptions'
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
                          @click='isAddDocumentPopoverVisible = false; additionalDocumentTypeId = null') Отмена
              el-button(slot='reference'
                        type='primary') Добавить документ

        el-row.mt-20(:gutter='20'
                     v-if='chedSettingsLoaded')
          el-col
            el-card.mb-20(
              v-for='(doc, index) in computedInternalAttachedDocs'
              :key='index'
              shadow='hover'
            )
              h4.mb-10 {{ doc.refDocTypeByDocTypeId.typeName }}
              el-row(:gutter='20')
                el-col(:span='7')
                  el-form-item(label='Номер')
                    el-input(
                      :value='doc.docNum'
                      :maxlength='50'
                      @input='setArrayObjectProp({ arrayName: "internalAttachedDocs", propName: "docNum", propValue: $event, propIndex: index })'
                    )
                el-col(:span='7')
                  el-form-item(label='Дата')
                    el-date-picker(
                      :value='doc.docDate'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                      :picker-options='{ firstDayOfWeek: 1 }'
                      @input='setArrayObjectProp({ arrayName: "internalAttachedDocs", propName: "docDate", propValue: $event, propIndex: index })'
                    )

                el-col(:span='7')
                  el-form-item(label='Примечание')
                    el-input(
                      :value='doc.docComment'
                      :maxlength='300'
                      @input='setArrayObjectProp({ arrayName: "internalAttachedDocs", propName: "docComment", propValue: $event, propIndex: index })'
                    )
                
                transition(name='fade' mode='out-in')
                  el-col(:span='7' v-if='doc.docFileName && doc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId.groupId !== 3')
                    el-form-item(label=' ')
                      a.file-link(:href='doc.fileLink')
                        i.el-icon-document 
                        span {{ doc.docFileName }}

                el-col(:span='7' v-if='(doc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId.groupId === 3) && can("RL_GF_DOC_MZHI")')
                  el-form-item(label=' ')
                    //- el-button(@click='initUploadingFile(index)') Прикрепить файл
                    label.upload-btn
                      i.el-icon-paperclip
                      span(style='margin-left: 3px') {{ (doc.docFileName || doc.docFile) ? 'Изменить файл' : 'Прикрепить файл' }}
                      input(type='file' ref='uploadInput' @change='uploadFile($event, index)' v-show='false')
                transition(name='fade' mode='out-in')
                  el-col(:span='7' v-if='doc.docFile && doc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId.groupId === 3 && can("RL_GF_READONLY")')
                    el-form-item(label=' ')
                      div.document-preview(@click='downloadLocalFile(doc.docFile)')
                        i.el-icon-document
                        span {{ doc.docFile.name.length > 14 ? doc.docFile.name.substr(0, 13) + '...' : doc.docFile.name }}
                        div.control-btn(@click.stop='deleteLocalFile(index)')
                          i.el-icon-close
                  el-col(:span='7' v-else-if='doc.docFileName && doc.docFileName !== "DELETED" && can("RL_GF_READONLY") && !doc.docFile && doc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId.groupId === 3')
                    el-form-item(label=' ')
                      div.document-preview(@click='downloadFile(doc, index)')
                        i.el-icon-document
                        span {{ doc.docFileName.length > 14 ? doc.docFileName.substr(0, 13) + '...' : doc.docFileName }}
                        div.control-btn(
                          v-if='can("RL_GF_DOC_MZHI")'
                          @click.stop='deleteFile(index)'
                        )
                          i.el-icon-close
                        
        el-row(v-else)
          el-col
            div(style='height:200px'
                v-loading='true')
          
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
// import { saveAs } from 'file-saver'
import { mutationTypes as requestMutationTypes } from '@/store/types/request'
import downloadMzhiDocument from '@/services/api/request/downloadInternalMzhiDoc'

const moduleName = 'request'
export default {
  name: 'AttachedDocsLicenseeDocs',
  props: {
    refDocTypes: {
      type: Array,
      default: () => []
    },
    chedSettings: {
      type: Object,
      default: () => {}
    },
    chedSettingsLoaded: {
      type: Boolean,
      default: false
    },
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAddDocumentPopoverVisible: false,
      additionalDocumentTypeId: null
    }
  },
  computed: {
    ...mapState(moduleName, {
      internalAttachedDocs: (state) => state.internalAttachedDocs,
      requestId: (state) => state.request.requestId
    }),
    ...mapGetters(['can', 'canAny']),
    licenseeDocTypesOptions() {
      return this.refDocTypes.filter((item) => {
        return item.refDocTypeGroupByGroupId.groupId === 3
      })
    },
    computedInternalAttachedDocs() {
      return this.internalAttachedDocs.map((doc) => {
        const documentId = doc.warehouseLink
        const groupId =
          doc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId.groupId
        const interdepRequest = doc.refDocTypeByDocTypeId.interdepRequest

        let fileLink = null

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
  methods: {
    ...mapMutations(moduleName, {
      setArrayObjectProp: requestMutationTypes.SET_ARRAY_OBJECT_PROP,
      setInternalAttachedDocs: requestMutationTypes.SET_INTERNAL_ATTACHED_DOCS
    }),
    addDocument(additionalDocumentTypeId) {
      const array = [...this.internalAttachedDocs]
      const item = this.licenseeDocTypesOptions.find(
        (el) => el.typeId === additionalDocumentTypeId
      )

      array.push(Object.assign({}, { refDocTypeByDocTypeId: item }))

      this.setInternalAttachedDocs(array)

      this.isAddDocumentPopoverVisible = false
      this.additionalDocumentTypeId = null
    },
    initUploadingFile(index) {
      this.$refs.uploadInput[index].click()
    },
    uploadFile(event, index) {
      console.log(this.requestId)
      const file = event.srcElement.files[0]
      const maxLengthFileName = 120

      if (!this.requestId) {
        this.$notify.warning({
          title: 'Внимание',
          message:
            'Для добавления файлов документов необходимо сохранить заявление.'
        })

        return false
      } else if (file.name.length > maxLengthFileName) {
        this.$notify.warning({
          title: 'Внимание',
          message: `Слишком длинное название файла. Максимально допустимое значение ${maxLengthFileName}.`
        })

        return false
      }

      this.setArrayObjectProp({
        arrayName: 'internalAttachedDocs',
        propName: 'docFile',
        propValue: file,
        propIndex: index
      })
    },
    downloadFile(doc, index) {
      downloadMzhiDocument({
        axiosModule: this.$axios,
        docId: doc.docId
      })
    },
    downloadLocalFile(docFile) {
      const blob = new Blob([docFile], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', docFile.name)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
      link.remove()
    },
    deleteFile(index) {
      this.setArrayObjectProp({
        arrayName: 'internalAttachedDocs',
        propName: 'docFileName',
        propValue: 'DELETED',
        propIndex: index
      })
    },
    deleteLocalFile(index) {
      this.setArrayObjectProp({
        arrayName: 'internalAttachedDocs',
        propName: 'docFile',
        propValue: null,
        propIndex: index
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.el-select-dropdown__item
  color: rgba(37, 37, 37, 1) !important
  font-size: 12px
  font-weight: 500
.upload-btn
  display: flex
  align-items: center
  justify-content: center
  width: 160px
  padding: 2px 7px
  border: 1px solid rgba(50, 50, 50, .075)
  color: rgba(50, 50, 50, .8)
  border-radius: 4px
  cursor: pointer
  transition: .2s
  &:hover
    background-color: rgba(122, 211, 255, .2)
  &:active
    background-color:  rgba(50, 50, 50, .1)

.document-preview
  display: flex
  align-items: center
  justify-content: center
  color: #0e69af !important
  padding: 2px 7px
  color: rgba(50, 50, 50, .8)
  border-radius: 4px
  cursor: pointer
  transition: .2s

  i
    margin-right: 6px

  span
    text-decoration: underline
    margin-right: 6px

  &:hover
    background-color: rgba(122, 211, 255, .2)
    span
      text-decoration: none
    .control-btn
      opacity: 1
      transform: translateY(0)
  &:active
    background-color:  rgba(50, 50, 50, .1)

.control-btn
  opacity: 0
  transform: translateY(10px)
  transition: .1s ease
</style>
