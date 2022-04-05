<template lang="pug">
  form-block.mb-10(title='Дополнительные сведения')
    template(slot='content')
      el-form(
        label-position='top'
        size='small'
        :disabled='isDisablePanelFields()'
      )
        el-row
          el-col(:span="14")
            el-form-item(label='Основания заключения, прекращения или расторжения договора')
              el-select.width-100(
                v-model='agreementFoundationId'
                size='small'
                placeholder='Укажите основание'
              )
                el-option(v-for='item in agreementFoundationsOptions'
                  :key='item.id'
                  :label='item.name'
                  :value='item.id')

        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Номер')
              el-input(
                v-model='agreementDocNum'
                maxlength="250"
              )

          el-col(:span='6')
            el-form-item(label='Дата')
              el-date-picker(
                v-model='agreementDocDate'
                placeholder='Укажите дату'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
                :picker-options='{ firstDayOfWeek: 1 }'
              )

        el-row(:gutter='20')
          el-col(
            v-if='isVisibleTransferFields(request)'
            :span="6"
          )
            el-form-item(label='Способ передачи')
              el-select.width-100(
                v-model='transferMethod'
                size='small'
                placeholder='Укажите способ передачи'
                value-key="id"
              )
                el-option(v-for='item in transferMethodOptions'
                  :key='item.id'
                  :label='item.name'
                  :value='item')

          el-col(
            v-if='isVisibleTransferFields(request)'
            :span="6"
          )
            el-form-item(label='Дата передачи')
              el-date-picker(
                v-model='agreementTransferDate'
                placeholder='Укажите дату передачи'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
                :picker-options='{ firstDayOfWeek: 1 }'
              )

          el-col(
            v-if='isVisibleAgreementRequestNum(request)'
            :span="12"
          )
            el-form-item(label='Номер Заявки размещения решения (протокола) в ГИС ЖКХ')
              el-input(
                @keypress.native="isNumber($event)"
                v-model='agreementRequestNum'
                :maxlength='9'
              )

        el-row
          el-col(
            v-if='ifVisibleAgreementConcludedField(request)'
          )
            el-form-item(
              label='Заключен договор УК с ТСЖ'
            )
              el-radio-group(v-model='agreementConcludedId')
                el-radio(
                  v-for='item in refYesNoOptions'
                  :key='item.id'
                  :label='item.id'
                  style='margin-bottom: 5px'
                ) {{ item.name }}

          el-col(v-if='request.typeId === 9 && request.licenseeType === "L"')
            el-form-item(
              label='У организации происходит реорганизация'
            )
              el-radio-group(v-model='isReorg')
                el-radio(
                  v-for='item in yesNoOptions'
                  :key='item.id'
                  :label='item.id'
                  style='margin-bottom: 5px'
                ) {{ item.name }}

        el-row(:gutter='20')
          el-col(
            v-if='request.isTsgRepr === "N" || request.typeId === 11'
            :span='12'
          )
            el-form-item(label='Серия и номер действующей лицензии')
              el-input(v-model='currentLicenseSerNum')

          el-col(
            v-if='request.isTsgRepr === "N" || request.typeId === 11'
            :span='12'
          )
            el-form-item(label='Дата выдачи действующей лицензии')
              el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }'
                v-model='currentLicenseDate'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
              )

        el-row(:gutter='20' v-if='request.typeId === 9 && request.licenseeType === "L" && isReorg === "Y"')
          el-col(:span='14')
            el-select.width-100(v-model='reorganizationFormId' size='small' placeholder='Укажите форму реорганизации')
              el-option(
                v-for='item in reorganizationFormsOptions'
                :key='item.id'
                :label='item.name'
                :value='item.id'
              )

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import fetchAgreementFoundations from '@/services/api/references/fetchAgreementFoundations'
import fetchReorganizationForms from '@/services/api/references/fetchReorganizationForms'
import fetchTransferMethods from '@/services/api/references/fetchTransferMethods'
import fetchYesNoValues from '@/services/api/references/fetchYesNoValues'
const moduleName = 'request'
export default {
  name: 'RequestMainExtraInfo',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      agreementFoundationsOptions: [],
      reorganizationFormsOptions: [],
      transferMethodOptions: [],
      // В базе заведён отдельный спарвочник
      refYesNoOptions: [],
      yesNoOptions: [
        {
          id: 'Y',
          name: 'Да'
        },
        {
          id: 'N',
          name: 'Нет'
        }
      ]
    }
  },
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request,
      licenseeAttachedDocs: (state) => state.licenseeAttachedDocs
    }),

    requestTypeId: {
      get() {
        return this.request.typeId
      }
    },

    regPlaceId: {
      get() {
        return this.request.regPlaceId
      }
    },

    agreementFoundationId: {
      get() {
        return this.request.agreementFoundationId
      },
      set(value) {
        this.set({ propName: 'agreementFoundationId', propValue: value })
      }
    },

    transferMethod: {
      get() {
        return this.request.transferMethod
      },
      set(value) {
        this.set({ propName: 'transferMethod', propValue: value })
      }
    },

    agreementConcludedId: {
      get() {
        const item = this.request.agreementConcluded
        if (typeof item !== 'undefined' && item !== null) {
          return this.request.agreementConcluded.id
        } else {
          return null
        }
      },
      set(value) {
        const selectedItem = this.refYesNoOptions.find((item) => {
          return item.id === value
        })
        this.set({ propName: 'agreementConcluded', propValue: selectedItem })
      }
    },

    isReorg: {
      get() {
        return this.request.isReorg
      },
      set(value) {
        this.set({ propName: 'isReorg', propValue: value })
      }
    },

    isTsgRepr: {
      get() {
        return this.request.isTsgRepr
      }
    },

    reorganizationFormId: {
      get() {
        return this.request.reorganizationFormId
      },
      set(value) {
        this.set({ propName: 'reorganizationFormId', propValue: value })
      }
    },

    currentLicenseSerNum: {
      get() {
        return this.request.currentLicenseSerNum
      },
      set(value) {
        this.set({ propName: 'currentLicenseSerNum', propValue: value })
      }
    },

    currentLicenseDate: {
      get() {
        return this.request.currentLicenseDate
      },
      set(value) {
        this.set({ propName: 'currentLicenseDate', propValue: value })
      }
    },

    agreementDocNum: {
      get() {
        return this.request.agreementDocNum
      },
      set(value) {
        this.set({ propName: 'agreementDocNum', propValue: value })

        /* Значение нужно продублировать в блоке "Документы заявителя" */
        const component = this
        this.licenseeAttachedDocs.forEach(function(doc, index) {
          if (
            doc.refDocTypeByDocTypeId &&
            doc.refDocTypeByDocTypeId.typeId === 75
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

    agreementDocDate: {
      get() {
        return this.request.agreementDocDate
      },
      set(value) {
        this.set({ propName: 'agreementDocDate', propValue: value })

        /* Значение нужно продублировать в блоке "Документы заявителя" */
        const component = this
        this.licenseeAttachedDocs.forEach(function(doc, index) {
          if (
            doc.refDocTypeByDocTypeId &&
            doc.refDocTypeByDocTypeId.typeId === 75
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

    agreementRequestNum: {
      get() {
        return this.request.agreementRequestNum
      },
      set(value) {
        this.set({ propName: 'agreementRequestNum', propValue: value })
      }
    },

    agreementTransferDate: {
      get() {
        return this.request.agreementTransferDate
      },
      set(value) {
        this.set({ propName: 'agreementTransferDate', propValue: value })
      }
    }
  },
  watch: {
    async requestTypeId() {
      this.agreementFoundationId = null
      this.agreementConcludedId = null
      await this.fetchAgreementFoundations()
    },
    async regPlaceId() {
      this.agreementFoundationId = null
      await this.fetchAgreementFoundations()
    },
    async isTsgRepr() {
      this.agreementFoundationId = null
      this.currentLicenseSerNum = null
      this.currentLicenseDate = null
      await this.fetchAgreementFoundations()
    },
    agreementFoundationId() {
      this.agreementRequestNum = null
      this.agreementTransferDate = null
      this.transferMethod = null
    }
  },
  mounted() {
    this.fetchAgreementFoundations()
    this.fetchReorganizationForms()
    this.fetchTransferMethodOptions()
    this.fetchYesNoOptions()
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP,
      setArrayObjectProp: mutationTypes.SET_ARRAY_OBJECT_PROP
    }),

    async fetchTransferMethodOptions() {
      this.transferMethodOptions = await fetchTransferMethods({
        axiosModule: this.$axios
      })
    },

    async fetchYesNoOptions() {
      this.refYesNoOptions = await fetchYesNoValues({
        axiosModule: this.$axios
      })
    },

    isDisablePanelFields() {
      return this.disabledEditing || this.regPlaceId === 2
    },

    async fetchAgreementFoundations() {
      const response = await fetchAgreementFoundations({
        axiosModule: this.$axios
      })
      this.agreementFoundationsOptions = response.filter((item) => {
        if (
          this.isDisablePanelFields() &&
          item.id === this.agreementFoundationId
        ) {
          /* Необходимо всегда выводить текстовое значение элемента по его id */
          return true
        }

        switch (item.id) {
          case 1: {
            return this.request.typeId !== 11
          }
          case 2: {
            return this.request.typeId !== 11 && this.request.isTsgRepr === 'Y'
          }
          case 3: {
            return this.request.typeId === 11
          }
          case 4: {
            return this.request.typeId === 8
          }
          case 5: {
            return this.request.typeId === 10
          }
          case 6: {
            return this.request.typeId === 10 && this.request.regPlaceId === 1
          }
          default: {
            return true
          }
        }
      })
    },

    async fetchReorganizationForms() {
      this.reorganizationFormsOptions = await fetchReorganizationForms({
        axiosModule: this.$axios
      })
    },

    isNumber(event) {
      if (!/\d/.test(event.key) && event.key !== '.') {
        return event.preventDefault()
      }
    },

    isVisibleAgreementRequestNum(request) {
      if (
        (request.typeId === 8 || request.typeId === 9) &&
        (request.agreementFoundationId === 2 ||
          request.agreementFoundationId === 1)
      ) {
        return true
      } else {
        return false
      }
    },

    isVisibleTransferFields(request) {
      if (
        (request.typeId === 8 ||
          request.typeId === 9 ||
          request.typeId === 10) &&
        request.agreementFoundationId === 1
      ) {
        return true
      }
    },

    ifVisibleAgreementConcludedField(request) {
      return (
        request.typeId === 8 || request.typeId === 9 || request.typeId === 10
      )
    }
  }
}
</script>
<style lang="sass"></style>
