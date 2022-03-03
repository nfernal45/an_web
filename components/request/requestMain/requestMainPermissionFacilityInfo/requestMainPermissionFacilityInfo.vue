<template lang="pug">
  form-block.mb-10(
      v-if="request.agreementFoundationId === 4"
      title='Сведения о разрешении на ввод объекта в эксплуатацию'
  )
    template(slot='content')
      el-form(
        label-position='top'
        size='small'
        :disabled='disabledEditing'
      )
        el-row(:gutter='20')

          el-col
            el-form-item(
              label='Разрешение на ввод в эксплуатацию выдано Мосгосстройнадзором или Администрацией городского округа Троицк/Щербинка?'
            )
              el-radio-group(v-model='explMosGorOkrugId')
                el-radio(
                  v-for='item in refYesNoOptions'
                  :key='item.id'
                  :label='item.id'
                  style='margin-bottom: 5px'
                ) {{ item.name }}

          el-col
            el-form-item(label='Дата разрешения на ввод объекта в эксплуатацию')
              el-date-picker(
                v-model='infInExplDatePermission'
                placeholder='Укажите дату разрешения на ввод объекта в эксплуатацию'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
                :picker-options='{ firstDayOfWeek: 1 }'
              )
          
          el-col
            el-form-item(label='Номер разрешения на ввод в эксплуатацию')
              el-input(
                v-model='infInExplNumPermission'
              )
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import fetchYesNoValues from '@/services/api/references/fetchYesNoValues'
const moduleName = 'request'
export default {
  name: 'RequestMainBuildingInfo',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refYesNoOptions: []
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request,
      licenseeAttachedDocs: (state) => state.request.licenseeAttachedDocs
    }),

    explMosGorOkrugId: {
      get() {
        const item = this.request.explMosGorOkrug
        if (typeof item !== 'undefined' && item !== null) {
          return this.request.explMosGorOkrug.id
        } else {
          return null
        }
      },
      set(value) {
        const selectedItem = this.refYesNoOptions.find((item) => {
          return item.id === value
        })
        this.set({ propName: 'explMosGorOkrug', propValue: selectedItem })
      }
    },

    infInExplDatePermission: {
      get() {
        return this.request.infInExplDatePermission
      },
      set(value) {
        this.set({ propName: 'infInExplDatePermission', propValue: value })

        /* Значение нужно продублировать в блоке "Документы заявителя" */
        const component = this
        this.licenseeAttachedDocs.forEach(function(doc, index) {
          if (
            doc.refDocTypeByDocTypeId &&
            doc.refDocTypeByDocTypeId.typeId === 45
          ) {
            component.setArrayObjectProp({
              arrayName: 'licenseeAttachedDocs',
              propName: 'docDate',
              propValue: value,
              propIndex: index
            })
          }
        })
      }
    },

    infInExplNumPermission: {
      get() {
        return this.request.infInExplNumPermission
      },
      set(value) {
        this.set({ propName: 'infInExplNumPermission', propValue: value })

        /* Значение нужно продублировать в блоке "Документы заявителя" */
        const component = this
        this.licenseeAttachedDocs.forEach(function(doc, index) {
          if (
            doc.refDocTypeByDocTypeId &&
            doc.refDocTypeByDocTypeId.typeId === 45
          ) {
            component.setArrayObjectProp({
              arrayName: 'licenseeAttachedDocs',
              propName: 'docNum',
              propValue: value,
              propIndex: index
            })
          }
        })
      }
    },

    agreementFoundationId: {
      get() {
        return this.request.agreementFoundationId
      }
    }
  },
  watch: {
    agreementFoundationId() {
      this.explMosGorOkrugId = null
      this.infInExplDatePermission = null
      this.infInExplNumPermission = null
    }
  },
  mounted() {
    this.fetchYesNoOptions()
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP,
      setArrayObjectProp: mutationTypes.SET_ARRAY_OBJECT_PROP
    }),

    async fetchYesNoOptions() {
      this.refYesNoOptions = await fetchYesNoValues({
        axiosModule: this.$axios
      })
    },

    isVisibleTemplate(request) {
      return request.agreementFoundationId === 4
    }
  }
}
</script>
<style lang="sass"></style>
