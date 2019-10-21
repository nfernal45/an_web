<template lang="pug">
  form-block.mb-10(title='Основные сведения')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row.mb-20
          el-col(:span='10')
            h4.form-title.mb-10 Цель обращения
            el-radio-group(v-model="appealTypeId")
              el-radio(
                v-for="item in computedAppealTypesOptions"
                :key="item.typeId"
                :label="item.typeId"
                style="margin-bottom: 5px"
              ) {{ item.typeName }}

          el-col(:span='14')
            el-row.mb-10
              h4.form-title.mb-10 Способ получения решения
              el-select.width-100(v-model='decisionIssueMethodId' size='small' placeholder='Укажите способ получения решения')
                el-option(v-for='item in decisionIssueMethodOptions'
                          :key='item.decisionIssueMethodId'
                          :label='item.decisionIssueMethodName'
                          :value='item.decisionIssueMethodId')
            el-row
              el-form-item(label='Плановый срок оказания ГУ')
                el-date-picker(v-model="planConsidDate" placeholder="Укажите плановый срок оказания ГУ" format='dd.MM.yyyy')
        
        el-row.mb-20
          el-col
            h4.form-title.mb-10 Место подачи документов
            el-radio-group(v-model="regPlaceId")
              el-radio(v-for="item in regPlaceOptions" :key="item.regPlaceId" :label='item.regPlaceId') {{ item.regPlaceName }}
        
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Рег.№')
              el-input(v-model="regnum")
          el-col(:span='6')
            el-form-item(v-show="regPlaceId === 1" label='Дата подачи заявления')
              el-date-picker(v-model="requestDate" format='dd.MM.yyyy')
            el-form-item(v-show="regPlaceId === 2" label='Дата подачи на портале')
              el-date-picker(v-model="outerRequestDate" format='dd.MM.yyyy')
          el-col(:span='12')
            employee-picker(v-model="regEmployeeId" label="Специалист службы одного окна")

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/appeal'
import fetchAppealTypesOptions from '@/services/api/requests/references/fetchAppealTypesOptions'
import fetchRegPlaceOptions from '@/services/api/requests/references/fetchRegPlaceOptions'
import { dateToString, stringToDate } from '@/services/date-parser'
import EmployeePicker from '@/elements/employeePicker/employeePicker'
const moduleName = 'appeal'
export default {
  name: 'AppealMainGeneralInfo',
  components: {
    EmployeePicker
  },
  data() {
    return {
      selectValue: '',
      appealTypesOptions: [],
      regPlaceOptions: [],
      decisionIssueMethodOptions: [
        {
          decisionIssueMethodName: 'В бумажном виде при личном посещении ОИВ',
          decisionIssueMethodId: 1
        },
        {
          decisionIssueMethodName: 'В электронном виде по электронной почте',
          decisionIssueMethodId: 2
        }
      ]
    }
  },
  computed: {
    ...mapState({
      appeal: (state) => state.appeal.appeal
    }),

    appealTypeId: {
      get() {
        return this.appeal.typeId
      },
      set(value) {
        this.set({ propName: 'typeId', propValue: value })
      }
    },

    decisionIssueMethodId: {
      get() {
        return this.appeal.decisionIssueMethodId
      },
      set(value) {
        this.set({ propName: 'decisionIssueMethodId', propValue: value })
      }
    },

    planConsidDate: {
      get() {
        return stringToDate(this.appeal.planConsidDate)
      },
      set(value) {
        this.set({ propName: 'planConsidDate', propValue: dateToString(value) })
      }
    },

    regPlaceId: {
      get() {
        return this.appeal.regPlaceId
      },
      set(value) {
        this.set({ propName: 'regPlaceId', propValue: value })
      }
    },

    regnum: {
      get() {
        return this.appeal.regnum
      },
      set(value) {
        this.set({ propName: 'regnum', propValue: value })
      }
    },

    requestDate: {
      get() {
        return stringToDate(this.appeal.requestDate)
      },
      set(value) {
        this.set({ propName: 'requestDate', propValue: dateToString(value) })
      }
    },

    outerRequestDate: {
      get() {
        return stringToDate(this.appeal.outerRequestDate)
      },
      set(value) {
        this.set({
          propName: 'outerRequestDate',
          propValue: dateToString(value)
        })
      }
    },

    regEmployeeId: {
      get() {
        return stringToDate(this.appeal.regEmployeeId)
      },
      set(value) {
        this.set({
          propName: 'regEmployeeId',
          propValue: dateToString(value)
        })
      }
    },

    computedAppealTypesOptions() {
      return this.appealTypesOptions
        .filter((type) => type.isGf)
        .sort((prevType, nextType) => nextType - prevType)
    }
  },
  mounted() {
    this.fetchAppealTypesOptions()
    this.fetchRegPlaceOptions()
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    }),
    async fetchAppealTypesOptions() {
      this.appealTypesOptions = await fetchAppealTypesOptions({
        axiosModule: this.$axios
      })
    },
    async fetchRegPlaceOptions() {
      this.regPlaceOptions = await fetchRegPlaceOptions({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
