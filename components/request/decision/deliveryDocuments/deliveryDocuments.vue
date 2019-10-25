е<template lang="pug">
  form-block(title='Выдача документов')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row.mb-20(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Дата выдачи решения')
              el-date-picker(v-model='docsIssueDate'
                             format="dd.MM.yyyy"
                             value-format="dd.MM.yyyy")
          el-col(:span='10')
            employee-picker(label='Документы выдал' v-model='licEmployeeId')

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import formBlock from '@/elements/formBlock'
import employeePicker from '@/elements/employeePicker'

const moduleName = 'request'
export default {
  name: 'DecisionNotification',
  components: {
    formBlock,
    employeePicker
  },
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request
    }),
    docsIssueDate: {
      get() {
        return this.request && this.request.docsIssueDate
      },
      set(value) {
        this.set({ propName: 'docsIssueDate', propValue: value })
      }
    },
    licEmployeeId: {
      get() {
        return this.request && this.request.licEmployeeId
      },
      set(value) {
        this.set({ propName: 'licEmployeeId', propValue: value })
      }
    }
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    })
  }
}
</script>
<style lang="sass"></style>
