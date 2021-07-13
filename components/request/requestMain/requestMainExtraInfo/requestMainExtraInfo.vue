<template lang="pug">
  form-block.mb-10(title='Дополнительные сведения')
    template(slot='content')
      el-form(
        label-position='top'
        size='small'
        :disabled='disabledEditing'
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

        el-row(:gutter='20' v-if='request.typeId === 10')
          el-col
            el-form-item(
              label='Заявитель является представителем ТСЖ, ЖСК, ОСЖ'
            )
              el-radio-group(v-model='isTsgRepr')
                el-radio(
                  v-for='item in yesNoOptions'
                  :key='item.id'
                  :label='item.id'
                  style='margin-bottom: 5px'
                ) {{ item.name }}

          el-col(:span='12')
            el-form-item(label='Серия и номер действующей лицензии')
              el-input(v-model='currentLicenseSerNum')

          el-col(:span='12')
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
      request: (state) => state.request
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
      },
      set(value) {
        this.set({ propName: 'isTsgRepr', propValue: value })
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
    }
  },
  watch: {
    async requestTypeId() {
      this.agreementFoundationId = null
      await this.fetchAgreementFoundations()
    },
    async regPlaceId() {
      this.agreementFoundationId = null
      await this.fetchAgreementFoundations()
    }
  },
  mounted() {
    this.fetchAgreementFoundations()
    this.fetchReorganizationForms()
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    }),

    async fetchAgreementFoundations() {
      const response = await fetchAgreementFoundations({
        axiosModule: this.$axios
      })
      this.agreementFoundationsOptions = response.filter((item) => {
        if (item.id === 5 || item.id === 6) {
          return this.request.typeId === 10 && this.request.regPlaceId === 1
        }
        return true
      })
    },

    async fetchReorganizationForms() {
      this.reorganizationFormsOptions = await fetchReorganizationForms({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
<style lang="sass"></style>
