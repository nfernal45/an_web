<template lang="pug">
  form-block.mb-10(title='Документы заявителя')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row.mb-20(:gutter='20')
          el-col(:span='10')
            el-button(type='primary'
                      @click='addDocumentDialogIsVisible = true') Добавить документ
        el-row(:gutter='20')
          el-col
            el-card.mb-20(v-for='(doc, index) in attachedDocs'
                          :key='index'
                          shadow='hover')
              h4.mb-10 {{ getDocTypeNameByDocTypeId(doc.docTypeId) }}
              el-row(:gutter='20')
                el-col(:span='7')
                  el-form-item(label='Номер')
                    //- el-input(v-model='doc.docNum')
                    el-input(
                      :value='doc.docNum'
                      @input='setArrayObjectProp({ arrayName: "gfAttachedDocsByRequestId", propName: "docNum", propValue: $event, propIndex: index })'
                    )
                el-col(:span='7')
                  el-form-item(label='Дата')
                    el-date-picker(v-model='doc.docDate'
                                   type='date'
                                   format="dd.MM.yyyy"
                                   value-format="dd.MM.yyyy"
                                   placeholder='Выберите дату')
                //- el-col(:span='6')
                //-   el-form-item(label='Кол-во страниц')
                //-     el-input
                el-col(:span='7' v-show='doc.docFileName')
                  el-form-item(label=' ')
                    span.file(@click='downloadFile(doc)')
                      i.el-icon-document 
                      span {{ doc.docFileName }}
          
        el-dialog(title='Добавление документа' :visible.sync='addDocumentDialogIsVisible')
          el-form-item(label='Тип документа')
            el-select(v-model='additionalDocumentTypeId' 
                      size='small'
                      style='width: 500px')
              el-option(v-for='item in addDocumentDocTypes'
                        :key='item.typeName'
                        :value='item.typeId'
                        :label='item.typeName')
          el-button(type='primary' @click='addDocument(additionalDocumentTypeId)') Добавить документ
          
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import fetchDocTypes from '@/services/api/requests/references/fetchDocTypes'
// import { cloneDeep } from 'lodash'
const moduleName = 'request'
export default {
  name: 'AttachedDocsApplicantDocs',
  data() {
    return {
      addDocumentDialogIsVisible: false,
      additionalDocumentTypeId: {},
      refDocTypes: []
    }
  },
  computed: {
    ...mapState(moduleName, {
      attachedDocs: (state) => state.request.gfAttachedDocsByRequestId
    }),
    docTypesToAddDocuments() {
      return this.refDocTypes.filter((item) => {
        return item.refDocTypeGroupByGroupId.groupId === 1
      })
    }
  },
  mounted() {
    this.fetchDocTypes()
  },
  methods: {
    ...mapMutations(moduleName, {
      setArrayObjectProp: mutationTypes.SET_ARRAY_OBJECT_PROP,
      set: mutationTypes.SET_ARRAY
    }),
    addDocument(docTypeId) {
      const array = [...this.attachedDocs]

      array.push({ docTypeId })

      this.set({ propName: 'gfAttachedDocsByRequestId', propValue: array })

      this.addDocumentDialogIsVisible = false
    },
    async fetchDocTypes() {
      this.refDocTypes = await fetchDocTypes({ axiosModule: this.$axios })
    },
    getDocTypeNameByDocTypeId(docTypeId) {
      const data = this.refDocTypes.find((item) => item.typeId === docTypeId)

      return data && data.typeName
    },
    downloadFile(doc) {
      // TODO: add system settings
      window.open(
        `https://stage-doc-upload.mos.ru/uform3.0/service/getcontent?os=GU_DOCS&id=${doc.warehouseLink}`
      )

      // const type = this.refDocTypes.find(
      //   (item) => item.typeId === doc.docTypeId
      // )

      // const groupId = type.refDocTypeGroupByGroupId.groupId
      // const interdepRequest = type.interdepRequest

      // if (groupId === 1 && !interdepRequest) {
      //   console.log('РЦХЭД')
      // } else if (groupId === 1 && interdepRequest) {
      //   console.log('ЦХЭД')
      // } else if (groupId === 2) {
      //   console.log('РЦХЭД')
      // }
    }
  }
}
</script>
<style lang="sass" scoped>
.el-select-dropdown__item
  color: rgba(37, 37, 37, 1) !important
  font-size: 12px
  font-weight: 500
.file
  color: #0e69af
  cursor: pointer
  i
    margin-right: 4px
  &:hover
    border-bottom: 1px solid #0e69af67
</style>
