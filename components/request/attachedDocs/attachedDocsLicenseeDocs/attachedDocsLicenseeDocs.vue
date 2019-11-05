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
                    a.file-link(@click='downloadFile(doc)')
                      i.el-icon-document 
                      span {{ doc.docFileName }}
          
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes as requestMutationTypes } from '@/store/types/request'
import fetchSettings from '@/services/api/settings/fetchSettings'

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
      additionalDocumentTypeId: null,
      systemSettings: []
    }
  },
  computed: {
    ...mapState(moduleName, {
      licenseeAttachedDocs: (state) => state.licenseeAttachedDocs
    }),
    licenseeDocTypesOptions() {
      return this.refDocTypes.filter((item) => {
        return item.refDocTypeGroupByGroupId.groupId === 1
      })
    }
  },
  mounted() {
    this.fetchSettings()
  },
  methods: {
    ...mapMutations(moduleName, {
      setArrayObjectProp: requestMutationTypes.SET_ARRAY_OBJECT_PROP,
      setLicenseeAttachedDocs: requestMutationTypes.SET_LICENSEE_ATTAHCHED_DOCS
    }),
    async fetchSettings() {
      const query = [
        'RL_CHED_FORM_DOMAIN',
        'RL_CHED_MZHI_OS',
        'RL_CHED_FORM_DOMAIN_BR',
        'RL_CHED_OS'
      ]

      this.systemSettings = await fetchSettings({
        axiosModule: this.$axios,
        query
      })
    },
    addDocument(additionalDocumentTypeId) {
      const array = [...this.licenseeAttachedDocs]
      const item = this.licenseeDocTypesOptions.find(
        (el) => el.typeId === additionalDocumentTypeId
      )

      array.push(Object.assign({}, { refDocTypeByDocTypeId: item }))

      this.setLicenseeAttachedDocs(array)

      this.isAddDocumentPopoverVisible = false
    },
    downloadFile(doc) {
      const documentId = doc.warehouseLink
      const groupId = doc.refDocTypeByDocTypeId.refDocTypeGroupByGroupId.groupId
      const interdepRequest = doc.refDocTypeByDocTypeId.interdepRequest

      const { settingValString: RCHED_DOMAIN } =
        this.systemSettings &&
        this.systemSettings.find(
          (item) => item.settingId === 'RL_CHED_FORM_DOMAIN'
        )

      const { settingValString: RCHED_REPOSITORY } =
        this.systemSettings &&
        this.systemSettings.find((item) => item.settingId === 'RL_CHED_MZHI_OS')

      const { settingValString: CHED_DOMAIN } =
        this.systemSettings &&
        this.systemSettings.find(
          (item) => item.settingId === 'RL_CHED_FORM_DOMAIN_BR'
        )

      const { settingValString: CHED_REPOSITORY } =
        this.systemSettings &&
        this.systemSettings.find((item) => item.settingId === 'RL_CHED_OS')

      let fileLink

      if (groupId === 1 && !interdepRequest) {
        fileLink = `https://${RCHED_DOMAIN}/uform3.0/service/getcontent?os=${RCHED_REPOSITORY}&id=${documentId}`
      } else if (groupId === 1 && interdepRequest) {
        fileLink = `https://${CHED_DOMAIN}/uform3.0/service/getcontent?os=${CHED_REPOSITORY}&id=${documentId}`
      } else if (groupId === 2 && !interdepRequest) {
        fileLink = `https://${RCHED_DOMAIN}/uform3.0/service/getcontent?os=${RCHED_REPOSITORY}&id=${documentId}`
      }

      window.open(fileLink)
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
