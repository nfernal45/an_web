<template lang="pug">
  div
    form-block.mb-10(title='Отвественный исполнитель' class='doc-check-violation-block')
      template(slot='content')
        el-form(
          label-position='top' 
          size='small'
          :disabled='disabledEditing')
          el-row(:gutter='20')
            el-col(:span='12')
              employee-picker(label='Ответственный исполнитель' v-model='performerId')

    el-form(
      label-position='top' 
      size='small'
      :disabled='disabledEditing')
      form-block.mb-10(
        v-for='(violationGroup, index) in computedDocCheckViolations'
        :key='violationGroup.id'
        :title='violationGroup.refViolationGroupByGroupId.name')
        template(slot='content')
          p Первичный осмотр
          el-row 
            el-form-item(label='Результат проверки')
              el-select(
                class='mr-10'
                :disabled='violationIsFixed'
                :value='violationGroup.primaryInspResultId'
                @input='changePrimaryInspectionResult({ value: $event, violationGroupId: violationGroup.id })'
              )
                el-option(
                  v-for='item in refInspectionResulst'
                  :key='item.id'
                  :label='item.name'
                  :value='item.id')
              el-button(
                type='primary'
                :disabled='violationIsFixed'
                @click=`openViolationDescriptionDialog({
                  currentViolationsDescription: violationGroup.primaryInspDescr,
                  violationGroupId: violationGroup.id,
                  refViolationGroupId: violationGroup.refViolationGroupByGroupId.id,
                  inspectionType: "primaryInspDescr"
                })`) Добавить описание из справочника нарушений
          el-row
            el-form-item(label='Описание нарушений по первичному осмотру')
              //- v-model='testValue'
              el-input(
                :value='violationGroup.primaryInspDescr'
                :disabled='violationIsFixed'
                class='doc-check-description-input'
                type='textarea'
                :autosize='{ minRows: 3 }'
                @input=`changeInspectionDescriptions({
                  value: $event,
                  violationGroupId: violationGroup.id,
                  inspectionType: 'primaryInspDescr'
                })`
              )

          p Осмотр после приостановки
          el-row
            el-form-item(label='Результат проверки')
              el-select(
                class='mr-10'
                :value='violationGroup.abeyanceInspResultId'
                @input='changeAbeyanceInspectionResult({ value: $event, violationGroupId: violationGroup.id })'
              ) 
                el-option(
                  v-for='item in refInspectionResulstAbeyancs'
                  :key='item.id'
                  :label='item.name'
                  :value='item.id')
              el-button(
                type='primary'
                @click=`openViolationDescriptionDialog({
                  violationGroupId: violationGroup.id,
                  refViolationGroupId: violationGroup.refViolationGroupByGroupId.id,
                  inspectionType: "abeyanceInspDescr"
                })`) Добавить описание из справочника нарушений
          el-row
            el-form-item(label='Описание нарушений после приостановки')
              el-input(
                class='doc-check-description-input'
                :value='violationGroup.abeyanceInspDescr'
                type='textarea'
                :autosize='{ minRows: 3 }'
                @input=`changeInspectionDescriptions({
                  value: $event,
                  violationGroupId: violationGroup.id,
                  inspectionType: 'abeyanceInspDescr'
                })`
              )
    
    form-block(title='Дополнительная проверка')
      template(slot='content')
        el-form(
          label-position='top' 
          size='small'
          :disabled='disabledEditing')
          el-row
            el-form-item(label='Создание распоряжения в ходе рассмотрения заявления')
              el-col(:span='4')
                el-radio(v-model='isInstructionRequired' label='Y') Требуется
              el-col(:span='4')
                el-radio(v-model='isInstructionRequired' label='N') Не требуется
          el-row(:gutter='20')
            el-col(:span='7')
              el-form-item(label='Дата направления документов')
                el-date-picker(
                  :picker-options='{ firstDayOfWeek: 1 }'
                  v-model='sendDate'
                  placeholder='Выберите дату'
                  type='date'
                  format="dd.MM.yyyy"
                  value-format="dd.MM.yyyy"
                )
            el-col(:span='7')
              el-form-item(label='Плановый срок исполнения')
                el-date-picker(
                  :picker-options='{ firstDayOfWeek: 1 }'
                  v-model='planExecDate'
                  disabled
                  type='date'
                  format="dd.MM.yyyy"
                  value-format="dd.MM.yyyy"
                )
          el-row
            el-col(:span='14')
              employee-picker(label='Ответственный исполнитель' v-model='addCheckExecId')
    doc-check-violations-descriptions-dialog(
      title='Справочник нарушений'
      :isVisible.sync='violationDescriptionDialog.isVisible'
      :refViolationGroupId='violationDescriptionDialog.refViolationGroupId'
      @select='selectViolationsDescriptions'
      @close='closeViolationDescriptionDialog')
    
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import docCheckViolationsDescriptionsDialog from '@/components/request/docCheck/docCheckViolationsDescriptionsDialog'
import fetchInspectionResults from '@/services/api/references/fetchInspectionResults'

const moduleName = 'request'
export default {
  name: 'DocCheckViolations',
  components: { docCheckViolationsDescriptionsDialog },
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      refInspectionResulst: [],
      violationDescriptionDialog: {
        isVisible: false,
        refViolationGroupId: null,
        inspectionType: ''
      },
      testValue: ''
    }
  },
  computed: {
    ...mapState(moduleName, {
      docCheck: (state) => state.docCheck,
      abeyance: (state) => {
        if (state.request.gfAbeyancesByRequestId)
          return state.request.gfAbeyancesByRequestId[0]
      }
    }),

    violationIsFixed() {
      return this.abeyance.violationFixed === 'Y'
    },

    computedDocCheckViolations() {
      return (
        this.docCheck.gfCheckViolationsByCheckId &&
        [...this.docCheck.gfCheckViolationsByCheckId].sort(
          (prevViolation, nextViolation) => {
            return (
              prevViolation.refViolationGroupByGroupId.id -
              nextViolation.refViolationGroupByGroupId.id
            )
          }
        )
      )
    },

    requestId() {
      return this.$route.params.id
    },

    performerId: {
      get() {
        return this.docCheck && this.docCheck.performerId
      },
      set(value) {
        this.setPropDocCheck({ propName: 'performerId', propValue: value })
      }
    },

    isInstructionRequired: {
      get() {
        return this.docCheck.isInstructionRequired
      },
      set(value) {
        this.setPropDocCheck({
          propName: 'isInstructionRequired',
          propValue: value
        })
      }
    },

    sendDate: {
      get() {
        return this.docCheck.sendDate
      },
      set(value) {
        this.setPropDocCheck({ propName: 'sendDate', propValue: value })
      }
    },

    planExecDate: {
      get() {
        return this.docCheck.planExecDate
      },
      set(value) {
        this.setPropDocCheck({ propName: 'planExecDate', propValue: value })
      }
    },

    addCheckExecId: {
      get() {
        return this.docCheck.addCheckExecId
      },
      set(value) {
        this.setPropDocCheck({ propName: 'addCheckExecId', propValue: value })
      }
    },

    refInspectionResulstAbeyancs() {
      return this.refInspectionResulst.filter(
        (result) => result.isAbeyance === 'Y'
      )
    }
  },
  mounted() {
    this.fetchInspectionResults()
    console.log(this.request)
  },
  methods: {
    ...mapMutations(moduleName, {
      setPropDocCheck: mutationTypes.SET_PROP_DOC_CHECK,
      setPrimaryInspectionResult:
        mutationTypes.SET_DOC_CHECK_PRIMARY_INSPECTION_RESULT,
      setAbeyanceInspectionResult:
        mutationTypes.SET_DOC_CHECK_ABEYANCE_INSPECTION_RESULT,
      setInspectionDescriptions:
        mutationTypes.SET_DOC_CHECK_INSPECTION_DESCRIPTION
    }),
    async fetchInspectionResults() {
      this.refInspectionResulst = await fetchInspectionResults({
        axiosModule: this.$axios
      })
    },
    changePrimaryInspectionResult({ value, violationGroupId }) {
      this.setPrimaryInspectionResult({ value, violationGroupId })
    },
    changeAbeyanceInspectionResult({ value, violationGroupId }) {
      this.setAbeyanceInspectionResult({ value, violationGroupId })
    },
    changeInspectionDescriptions({ value, violationGroupId, inspectionType }) {
      this.setInspectionDescriptions({
        value,
        violationGroupId,
        inspectionType
      })
    },
    openViolationDescriptionDialog({
      currentViolationsDescription,
      violationGroupId,
      refViolationGroupId,
      inspectionType
    }) {
      this.violationDescriptionDialog.currentViolationsDescription = currentViolationsDescription
      this.violationDescriptionDialog.inspectionType = inspectionType
      this.violationDescriptionDialog.refViolationGroupId = refViolationGroupId
      this.violationDescriptionDialog.violationGroupId = violationGroupId
      this.violationDescriptionDialog.isVisible = true
    },
    closeViolationDescriptionDialog() {
      this.violationDescriptionDialog.inspectionType = ''
      this.violationDescriptionDialog.refViolationGroupId = null
      this.violationDescriptionDialog.violationGroupId = null
      this.violationDescriptionDialog.isVisible = false
    },
    selectViolationsDescriptions(violationsArray) {
      const initialValue = this.violationDescriptionDialog
        .currentViolationsDescription
        ? `${this.violationDescriptionDialog.currentViolationsDescription}\n`
        : ''
      this.changeInspectionDescriptions({
        value: `${initialValue}${violationsArray.join('\n\n')}\n`,
        violationGroupId: this.violationDescriptionDialog.violationGroupId,
        inspectionType: this.violationDescriptionDialog.inspectionType
      })
    }
  }
}
</script>
<style lang="sass">
.doc-check-violation-block h3
  font-weigth: normal

.doc-check-description-input
  textarea
    max-height: 400px
</style>
