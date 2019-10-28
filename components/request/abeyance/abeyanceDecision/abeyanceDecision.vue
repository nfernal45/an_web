<template lang="pug">
  form-block(title='Приостановление решения заявления')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Номер')
              el-input(v-model='abeyanceRegnum')
          el-col(:span='6')
            el-form-item(label='Дата приостановления')
              el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }'
                v-model='startDate'
                format="dd.MM.yyyy"
                value-format="dd.MM.yyyy"
              )
          el-col(:span='11')
            employee-picker(v-model='signerId' label='Руководитель')

        el-row(:gutter='20')
          el-col(:span='6' :offset='6')
            el-form-item(label='Приостановлено до:')
              el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }'
                v-model='endDate'
                format="dd.MM.yyyy"
                value-format="dd.MM.yyyy"
              )
          el-col(:span='11')
            employee-picker(v-model='executorId' label='Исполнитель')

        el-row(:gutter='20')
          el-col
            el-form-item(label='Основания для приостановления')
              el-checkbox-group(v-model='refAbeyanceReasons')
                el-checkbox(
                  v-for='abeyanceReason in computedRefAbeyanceReasonsOptions'
                  :key="abeyanceReason.reasonId"
                  :label='abeyanceReason.reasonId'
                ) {{ abeyanceReason.reasonName }}

        el-row(:gutter='20')
          el-col
            el-form-item(label='Причина приостановления')
              el-input(v-model='reason'
                       type='textarea'
                       :minlength='10'
                       :maxlength='500')
        
        el-row(:gutter='20')
          el-col(:span='16')
            el-form-item(label=' ')
              el-checkbox(label='Получены документы, приложенные заявителем в Личном кабинете'
                          v-model='docsRecived'
                          true-label='Y'
                          false-label='N'
                          border)
            el-form-item
              el-checkbox(label='Нарушения устранены в полном объёме'
                          v-model='violationFixed'
                          true-label='Y'
                          false-label='N'
                          border)
          el-col(:span='8')
            el-form-item(label='Дата получения:')
              el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }'
                v-model='receiveDate'
                format="dd.MM.yyyy"
                value-format="dd.MM.yyyy"
              ) 
            el-form-item(label='Дата возобновления:')
              el-date-picker(:picker-options='{ firstDayOfWeek: 1 }' v-model='recommenceDate'
                             format="dd.MM.yyyy"
                             value-format="dd.MM.yyyy")


</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import fetchAbeyanceReasons from '@/services/api/requests/references/fetchAbeyanceReasons'
import employeePicker from '@/elements/employeePicker'

const moduleName = 'request'

export default {
  name: 'AbeyanceDecision',
  components: {
    employeePicker
  },
  data() {
    return {
      refAbeyanceReasonsOptions: []
    }
  },
  computed: {
    ...mapState({
      abeyance: (state) => {
        if (state.request.request.gfAbeyancesByRequestId)
          return state.request.request.gfAbeyancesByRequestId[0]
      }
    }),
    computedRefAbeyanceReasonsOptions() {
      return (
        this.refAbeyanceReasonsOptions &&
        this.refAbeyanceReasonsOptions
          .filter((item) => item.gf === 'Y')
          .map((item) => ({
            reasonId: item.reasonId,
            reasonName: item.reasonName,
            versionNumber: item.versionNumber,
            defaultReasonText: item.defaultReasonText,
            dayCount: item.dayCount,
            etpCode: item.etpCode,
            isActive: item.isActive
          }))
      )
    },
    abeyanceRegnum: {
      get() {
        return this.abeyance && this.abeyance.abeyanceRegnum
      },
      set(value) {
        this.setProp('abeyanceRegnum', value)
      }
    },
    startDate: {
      get() {
        return this.abeyance && this.abeyance.startDate
      },
      set(value) {
        this.setProp('startDate', value)
      }
    },
    endDate: {
      get() {
        return this.abeyance && this.abeyance.endDate
      },
      set(value) {
        this.setProp('endDate', value)
      }
    },
    reason: {
      get() {
        return this.abeyance && this.abeyance.reason
      },
      set(value) {
        this.setProp('reason', value)
      }
    },
    receiveDate: {
      get() {
        return this.abeyance && this.abeyance.receiveDate
      },
      set(value) {
        this.setProp('receiveDate', value)
      }
    },
    recommenceDate: {
      get() {
        return this.abeyance && this.abeyance.recommenceDate
      },
      set(value) {
        this.setProp('recommenceDate', value)
      }
    },
    docsRecived: {
      get() {
        return this.abeyance && this.abeyance.docsRecived
      },
      set(value) {
        this.setProp('docsRecived', value)
      }
    },
    violationFixed: {
      get() {
        return this.abeyance && this.abeyance.violationFixed
      },
      set(value) {
        this.setProp('violationFixed', value)
      }
    },
    executorId: {
      get() {
        return this.abeyance && this.abeyance.executorId
      },
      set(value) {
        this.setProp('executorId', value)
      }
    },
    signerId: {
      get() {
        return this.abeyance && this.abeyance.signerId
      },
      set(value) {
        this.setProp('signerId', value)
      }
    },
    refAbeyanceReasons: {
      get() {
        // return (this.abeyance && this.abeyance.refAbeyanceReasons) || []
        return (
          (this.abeyance &&
            this.abeyance.refAbeyanceReasons &&
            this.abeyance.refAbeyanceReasons.map(
              (abeyanceReason) => abeyanceReason.reasonId
            )) ||
          []
        )
      },
      set(value) {
        const abeyanceReason = this.computedRefAbeyanceReasonsOptions.filter(
          (computedAbeyanceReason) => {
            return value.some(
              (value) => value === computedAbeyanceReason.reasonId
            )
          }
        )
        this.setProp('refAbeyanceReasons', abeyanceReason)
      }
    }
  },
  mounted() {
    this.fetchAbeyanceReasons()
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP,
      setArray: mutationTypes.SET_ARRAY
    }),
    async fetchAbeyanceReasons() {
      this.refAbeyanceReasonsOptions = await fetchAbeyanceReasons({
        axiosModule: this.$axios
      })
    },
    setProp(key, value) {
      const newValue = Object.assign({}, this.abeyance, {
        [key]: value
      })
      this.set({
        propName: 'gfAbeyancesByRequestId',
        propValue: [newValue]
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.form-title
  color: #0e69af
</style>
