<template lang="pug">
  form-block.mb-10(title='Заключение по итогам проверки заявления и документов')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row.mb-10(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Номер')
              el-input(v-model='actNo')
          el-col(:span='6')
            el-form-item(label='Дата:')
              el-date-picker(v-model='actDate'
                             format="dd.MM.yyyy"
                             value-format="dd.MM.yyyy")
          el-col(:span='10')
            employee-picker(v-model='signerId' label='Руководитель')

          el-col(:span='10' :offset='12')
            employee-picker(v-model='test1' label='Исполнитель')
        
        el-row.mb-10
          el-col
            el-input(type='textarea' v-model='conclusion')
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import employeePicker from '@/elements/employeePicker'
const moduleName = 'request'

export default {
  name: 'DocCheckConclusion',
  components: {
    employeePicker
  },
  data() {
    return {
      test1: ''
    }
  },
  computed: {
    ...mapState(moduleName, {
      docCheck: (state) => state.docCheck
    }),
    actNo: {
      get() {
        return this.docCheck && this.docCheck.actNo
      },
      set(value) {
        this.setPropDocCheck({ propName: 'actNo', propValue: value })
      }
    },
    actDate: {
      get() {
        return this.docCheck && this.docCheck.actDate
      },
      set(value) {
        this.setPropDocCheck({ propName: 'actDate', propValue: value })
      }
    },
    signerId: {
      get() {
        return this.docCheck && this.docCheck.signerId
      },
      set(value) {
        this.setPropDocCheck({ propName: 'signerId', propValue: value })
      }
    },
    conclusion: {
      get() {
        return this.docCheck && this.docCheck.conclusion
      },
      set(value) {
        this.setPropDocCheck({ propName: 'conclusion', propValue: value })
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
<style lang="sass" scoped></style>
