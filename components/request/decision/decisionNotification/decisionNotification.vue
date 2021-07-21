<template lang="pug">
  form-block(title='Уведомление')
    template(slot='content')
      el-form(
        size='small'
        label-position='top'
        :disabled='disabledEditing'
      )
        el-row.mb-20(:gutter='20')
          el-col.mb-10
            el-col(:span='6')
              el-radio(v-model='decisionType' :disabled="isDecisionTypeRadioGroupDisabled" label='D') О внесении изменений
            el-col(:span='6')
              el-radio(v-model='decisionType' :disabled="isDecisionTypeRadioGroupDisabled" label='R') Отказ
          el-col
            el-col(:span='16')
              el-form-item(label='Примечание')
                el-input(type='textarea' v-model='decisionComments' :maxlength='2000')

        el-row(:gutter='20')
          el-col(v-show='decisionType === "D"')
            el-col
              h5.mb-10 {{ getTheRightReason }}
              el-form-item(label='Фактическая дата внесения изменений в реестр')
                el-date-picker(:picker-options='{ firstDayOfWeek: 1 }'
                                v-model='registryUpdateDate'
                                placeholder='Выберите дату'
                                type='date'
                                format="dd.MM.yyyy"
                                value-format="dd.MM.yyyy"
                              )


          el-col(v-show='decisionType === "R"')
            el-col
              el-checkbox-group(v-model='gfRefusalReasonRequestId')
                el-checkbox(v-for='item in refRefusalReasons'
                          :key='item.reasonId'
                          :label='item.reasonId'
                          style='margin-bottom: 3px') {{ item.reasonName }}
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import fetchAcceptReasons from '@/services/api/references/fetchAcceptReasons'
import fetchRefusalReasons from '@/services/api/references/fetchRefusalReasons'

const moduleName = 'request'
export default {
  name: 'DocumentsIssue',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refAcceptReasons: [],
      refRefusalReasons: [],
      selectValue: []
    }
  },
  computed: {
    ...mapState(moduleName, {
      gfCheckViolationsByCheckId: (state) =>
        state.docCheck.gfCheckViolationsByCheckId,
      request: (state) => state.request,
      requestRefusalReason: (state) => state.request.gfRefusalReasonRequestId
    }),
    computedAcceptResouns() {
      return (
        this.refAcceptReasons &&
        this.refAcceptReasons.filter((item) => item.gf === 'Y')
      )
    },
    getTheRightReason() {
      if (this.request.typeId === 8 || this.request.typeId === 11) {
        const item = this.computedAcceptResouns.find(
          (item) => item.reasonId === 3
        )
        return item && item.reasonName
      } else if (this.request.typeId === 9) {
        const item = this.computedAcceptResouns.find(
          (item) => item.reasonId === 4
        )
        return item && item.reasonName
      } else if (this.request.typeId === 10) {
        const item = this.computedAcceptResouns.find(
          (item) => item.reasonId === 5
        )
        return item && item.reasonName
      } else return ''
    },
    decisionComments: {
      get() {
        return this.request && this.request.decisionComments
      },
      set(value) {
        this.set({ propName: 'decisionComments', propValue: value })
      }
    },
    decisionType: {
      get() {
        return this.request && this.request.decisionType
      },
      set(value) {
        this.set({ propName: 'decisionType', propValue: value })
      }
    },
    registryUpdateDate: {
      get() {
        return this.request && this.request.registryUpdateDate
      },
      set(value) {
        this.set({ propName: 'registryUpdateDate', propValue: value })
      }
    },
    gfRefusalReasonRequestId: {
      get() {
        return (
          (this.request &&
            this.request.gfRefusalReasonRequestId &&
            this.request.gfRefusalReasonRequestId.map(
              (refusalReason) => refusalReason.reasonId
            )) ||
          []
        )
      },
      set(value) {
        const result = []
        value.forEach((reasonId) => {
          result.push({ reasonId })
        })

        this.set({ propName: 'gfRefusalReasonRequestId', propValue: result })
      }
    },
    isDecisionTypeRadioGroupDisabled() {
      // Если Заявление с ЦО=10
      // «Исключение дома из реестра» и Основание =
      // (Решение суда (agreementFoundationId = 5) или Решения ОГЖН (6))
      // то "Тип уведомления" = Распоряжение (GF_REQUEST.DECISION_TYPE=D)
      // и радиогруппа заблокирована

      if (
        this.request.typeId === 10 &&
        (this.request.agreementFoundationId === 5 ||
          this.request.agreementFoundationId === 6)
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.decisionType = 'D'
        return true
      }

      // Если в Заявлении есть запись с проверкой нарушений Требования
      // GF_CHECK_VIOLATION.ID с Требованием 6
      // GF_CHECK_VIOLATION.GROUP_ID=6 и
      // (Результат проверки по первичному осмотру=Не соответствует или
      // Результат проверки по осмотру после приостановки=Не соответствует)
      // PRIMARY_INSP_RESULT_ID=2 или ABEYANCE_INSP_RESULT_ID=2
      // то "Тип уведомления" = Отказ (GF_REQUEST.DECISION_TYPE=R)
      // и радиогруппа заблокирована

      if (
        this.gfCheckViolationsByCheckId &&
        this.gfCheckViolationsByCheckId.length
      ) {
        const violation = this.gfCheckViolationsByCheckId.find(
          (item) => item.refViolationGroupByGroupId.id === 6
        )

        if (
          violation &&
          (violation.abeyanceInspResultId === 2 ||
            violation.primaryInspResultId === 2)
        ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.decisionType = 'R'
          return true
        }

        // Если в Заявлении все записи с проверками нарушений Требований
        // GF_CHECK_VIOLATION.ID с "Результат проверки по первичному осмотру"
        // = Соответствует //PRIMARY_INSP_RESULT_ID=1 или с "Результат проверки по
        // осмотру после приостановки" = Соответствует
        // ABEYANCE_INSP_RESULT_ID=1
        // то "Тип уведомления" = Распоряжение (GF_REQUEST.DECISION_TYPE=D)
        // и радиогруппа заблокирована

        const allViolationDecided = this.gfCheckViolationsByCheckId.filter(
          (item) =>
            item.primaryInspResultId === 1 || item.abeyanceInspResultId === 1
        )

        if (
          allViolationDecided.length === this.gfCheckViolationsByCheckId.length
        ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.decisionType = 'D'
          return true
        }

        // Если в Заявлении есть хотя бы одна запись с проверкой нарушений Требования
        // GF_CHECK_VIOLATION.ID

        // с Требованием 1
        // GF_CHECK_VIOLATION.GROUP_ID=1 и Результат проверки по первичному осмотру
        // = Не соответствует PRIMARY_INSP_RESULT_ID=2

        // с Требованием 4
        // GF_CHECK_VIOLATION.GROUP_ID=4 и Результат проверки по первичному
        // осмотру = Не соответствует PRIMARY_INSP_RESULT_ID=2

        // с Требованием 5
        // GF_CHECK_VIOLATION.GROUP_ID=5 и Результат проверки по первичному
        // осмотру = Не соответствует PRIMARY_INSP_RESULT_ID=2

        // с Требованием 6
        // GF_CHECK_VIOLATION.GROUP_ID=6 и Результат проверки по первичному
        // осмотру = Не соответствует PRIMARY_INSP_RESULT_ID=2
        // то "Тип уведомления" = Отказ (GF_REQUEST.DECISION_TYPE=R)
        // и радиогруппа заблокирована

        if (
          this.gfCheckViolationsByCheckId.filter((item) => {
            if (
              item.refViolationGroupByGroupId.id === 1 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            if (
              item.refViolationGroupByGroupId.id === 4 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            if (
              item.refViolationGroupByGroupId.id === 5 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            if (
              item.refViolationGroupByGroupId.id === 6 &&
              item.primaryInspResultId === 2
            ) {
              return true
            }
            return false
          }).length
        ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.decisionType = 'R'
          return true
        }

        // Если в Заявлении есть хотя бы одна запись с проверкой нарушений
        // Требования GF_CHECK_VIOLATION.ID и с "Результат проверки по осмотру
        // после приостановки" = Не соответствует
        // ABEYANCE_INSP_RESULT_ID=2 то
        // "Тип уведомления" = Отказ (GF_REQUEST.DECISION_TYPE=R)
        //  и радиогруппа заблокирована

        if (
          this.gfCheckViolationsByCheckId.find(
            (item) => item.abeyanceInspResultId === 2
          )
        ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.decisionType = 'R'
          return true
        }
      }
      return false
    }
  },
  async mounted() {
    this.refAcceptReasons = await this.fetchAcceptReasons()
    this.refRefusalReasons = await this.fetchRefusalReasons()
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    }),
    fetchAcceptReasons() {
      return fetchAcceptReasons({
        axiosModule: this.$axios
      })
    },
    fetchRefusalReasons() {
      return fetchRefusalReasons({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
<style lang="sass"></style>
