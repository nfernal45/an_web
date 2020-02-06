<template lang="pug">
  form-block.mb-10(title='Документы МЖИ' tooltip='')
    template(slot='tooltip')
      el-tooltip(effect='light' placement="top-start")
        div(slot='content')
          span Приложить документ МЖИ можно в соответствующих статусах:
          ul(style='margin-top:5px;')
            li Оформляется решение (должно быть указано решение по заявлению)
            li Приостановлено
            li Оформление приостановления
        i.el-icon-warning-outline
    template(slot='content')
      ched-form(@upload='addDocument' :chedSettings='chedSettings' :disabled='disabledEditing' v-if='chedSettingsLoaded')
      el-form(
        size='small' 
        label-position='top'
        :disabled='disabledEditing'
      )
        el-row(:gutter='20')
          el-col
            el-card.mb-20(
              v-for='(doc, index) in computedMzhiAttachedDocs'
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
                      @input='setArrayObjectProp({ arrayName: "mzhiAttachedDocs", propName: "docNum", propValue: $event, propIndex: index })'
                    )
                el-col(:span='7')
                  el-form-item(label='Дата')
                    el-date-picker(
                      :value='doc.docDate'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                      :picker-options='{ firstDayOfWeek: 1 }'
                      @input='setArrayObjectProp({ arrayName: "mzhiAttachedDocs", propName: "docDate", propValue: $event, propIndex: index })'
                    )
                el-col(v-show='doc.docFileName')
                  a.file-link(:href='doc.fileLink' taget="_blank")
                    i.el-icon-document 
                    span {{ doc.docFileName }}
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ChedForm from '@/components/request/attachedDocs/chedForm'
import {
  mutationTypes as requestMutationTypes,
  actionTypes as requestActionTypes
} from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'AttachedDocsMzhiDocs',
  components: {
    ChedForm
  },
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
  computed: {
    ...mapState(moduleName, {
      mzhiAttachedDocs: (state) => state.mzhiAttachedDocs
    }),

    computedMzhiAttachedDocs() {
      return this.mzhiAttachedDocs.map((doc) => {
        return Object.assign(doc, {
          fileLink: `https://${this.chedSettings.RL_CHED_FORM_DOMAIN}/uform3.0/service/getcontent?os=${doc.warehouseName}&id=${doc.warehouseLink}`
        })
      })
    }
  },
  methods: {
    ...mapMutations(moduleName, {
      setMzhiAttachedDocs: requestMutationTypes.SET_MZHI_ATTAHCHED_DOCS,
      setArrayObjectProp: requestMutationTypes.SET_ARRAY_OBJECT_PROP
    }),
    ...mapActions(moduleName, {
      saveRequest: requestActionTypes.SAVE_REQUEST
    }),

    addDocument(file) {
      const array = [...this.mzhiAttachedDocs]

      const refDocTypeByDocTypeId = this.refDocTypes.find(
        (type) => type.warehouseDocType === file.documentClassId
      )

      array.push(
        Object.assign(
          {},
          {
            warehouseLink: file.guid,
            docFileName: file.name,
            warehouseName: 'GU_DOCS',
            refDocTypeByDocTypeId
          }
        )
      )

      this.setMzhiAttachedDocs(array)
      this.saveRequest()
    }
  }
}
</script>
<style lang="sass"></style>
