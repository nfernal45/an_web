<template lang="pug">
  form-block.mb-10(title='Документы заявителя')
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
              v-for='(doc, index) in computedLicenseeAttachedDocs'
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
                      @input='setArrayObjectProp({ arrayName: "licenseeAttachedDocs", propName: "docNum", propValue: $event, propIndex: index })'
                    )
                el-col(:span='7')
                  el-form-item(label='Дата')
                    el-date-picker(
                      :value='doc.docDate'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                      :picker-options='{ firstDayOfWeek: 1 }'
                      @input='setArrayObjectProp({ arrayName: "licenseeAttachedDocs", propName: "docDate", propValue: $event, propIndex: index })'
                    )
                el-col(:span='7' v-show='doc.docFileName')
                  el-form-item(label=' ')
                    a.file-link(:href='doc.fileLink')
                      i.el-icon-document 
                      span {{ doc.docFileName }}
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
      licenseeAttachedDocs: (state) => state.licenseeAttachedDocs
    }),
    licenseeDocTypesOptions() {
      return this.refDocTypes.filter((item) => {
        return (
          item.refDocTypeGroupByGroupId.groupId === 1 && item.isActive === 'Y'
        )
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
  methods: {
    ...mapMutations(moduleName, {
      setArrayObjectProp: requestMutationTypes.SET_ARRAY_OBJECT_PROP,
      setLicenseeAttachedDocs: requestMutationTypes.SET_LICENSEE_ATTAHCHED_DOCS
    }),
    addDocument(additionalDocumentTypeId) {
      const array = [...this.licenseeAttachedDocs]
      const item = this.licenseeDocTypesOptions.find(
        (el) => el.typeId === additionalDocumentTypeId
      )

      array.push(Object.assign({}, { refDocTypeByDocTypeId: item }))

      this.setLicenseeAttachedDocs(array)

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
