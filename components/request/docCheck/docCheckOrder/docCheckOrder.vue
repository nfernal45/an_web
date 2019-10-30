<template lang="pug">
  form-block.mb-10(title='Распоряжение на проведение проверки')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Номер')
              el-input(v-model='instructionNo')
          el-col(:span='6')
            el-form-item(label='Дата:')
              el-date-picker(v-model='instructionDate'
                             format="dd.MM.yyyy"
                             value-format="dd.MM.yyyy"
                             :picker-options='{ firstDayOfWeek: 1 }')

          el-col(:span='10')
            employee-picker(label='Руководитель' v-model='employeeSigner')
          el-col(:span='10' :offset='12')
            employee-picker(label='Исполнитель' v-model='employeeExecutor')

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
const moduleName = 'request'

export default {
  name: 'DocCheckOrder',
  data() {
    return {
      employeeSigner: '',
      employeeExecutor: ''
    }
  },
  computed: {
    ...mapState(moduleName, {
      docCheck: (state) => state.docCheck
    }),
    instructionNo: {
      get() {
        return this.docCheck && this.docCheck.instructionNo
      },
      set(value) {
        this.setPropDocCheck({ propName: 'instructionNo', propValue: value })
      }
    },
    instructionDate: {
      get() {
        return this.docCheck && this.docCheck.instructionDate
      },
      set(value) {
        this.setPropDocCheck({ propName: 'instructionDate', propValue: value })
      }
    }
  },
  methods: {
    ...mapMutations(moduleName, {
      setPropDocCheck: mutationTypes.SET_PROP_DOC_CHECK
    })
  }
}
</script>
<style lang="sass"></style>
