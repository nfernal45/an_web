<template lang="pug">
  form-block.mb-10(title='Внутренние документы МЖИ')
    template(slot='content')
      el-form(size='small' label-position='top')
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
                      @input='setArrayObjectProp({ arrayName: "internalAttachedDocs", propName: "docComment", propValue: $event, propIndex: index })'
                    )
                
                el-col(:span='7' v-if='doc.docFileName')
                  el-form-item(label=' ')
                    a.file-link(:href='doc.fileLink')
                      i.el-icon-document 
                      span {{ doc.docFileName }}
                el-col(:span='7' v-else)
                  el-form-item(label=' ')
                    el-button Прикрепить файл
        el-row(v-else)
          el-col
            div(style='height:200px'
                v-loading='true')
          
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes as requestMutationTypes } from '@/store/types/request'

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
    }
  },
  data() {
    return {
      isAddDocumentPopoverVisible: false,
      additionalDocumentTypeId: null
    }
  },
  mounted() {
    console.log(this.internalAttachedDocs)
  },
  computed: {
    ...mapState(moduleName, {
      internalAttachedDocs: (state) => state.internalAttachedDocs
    }),
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
    }
  }
}
</script>
<style lang="sass" scoped>
.el-select-dropdown__item
  color: rgba(37, 37, 37, 1) !important
  font-size: 12px
  font-weight: 500
</style>
