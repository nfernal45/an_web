<template lang="pug">
  form-block.mb-10(title='Документы заявителя')
    template(slot='content')
      el-form(size='small' label-position='top')

        el-row(:gutter='20')
          el-col(:span='10')
            el-popover(placement='top'
                       width='430'
                       v-model='isAddDocumentPopoverVisible')
              el-form-item(label='Тип документа')
                el-select(v-model='additionalDocumentTypeId' 
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
                          @click='isAddDocumentPopoverVisible = false') Отмена
              el-button(slot='reference'
                        type='primary') Добавить документ

        el-row.mt-20(:gutter='20')
          el-col
            el-card.mb-20(
              v-for='(doc, index) in licenseeAttachedDocs'
              :key='index'
              shadow='hover'
            )
              h4.mb-10 {{ doc.refDocTypeByDocTypeId.typeName }}
              el-row(:gutter='20')
                el-col(:span='7')
                  el-form-item(label='Номер')
                    el-input(
                      :value='doc.docNum'
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

    computedLicenseeAttachedDocs() {
      return this.map((doc) => {
        Object.assign(doc, {
          fileLink: `https://stage-doc-upload.mos.ru/uform3.0/service/getcontent?os=GU_DOCS&id=${doc.warehouseLink}`
        })
      })
    },

    licenseeDocTypesOptions() {
      return this.refDocTypes.filter((item) => {
        return item.refDocTypeGroupByGroupId.groupId === 1
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
