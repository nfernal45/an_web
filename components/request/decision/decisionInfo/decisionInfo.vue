<template lang="pug">
  form-block(title='Решение по заявлению')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Номер')
              el-input(v-model='decisionNum')
          el-col(:span='6')
            el-form-item(label='Дата приостановления')
              el-date-picker(v-model='decisionDate'
                             format="dd.MM.yyyy"
                             value-format="dd.MM.yyyy"
                             :picker-options='{ firstDayOfWeek: 1 }')
          el-col(:span='11')
            employee-picker(v-model='licSignerId' label='Руководитель')

        el-row(:gutter='20')
          el-col(:span='11' :offset='12')
            employee-picker(v-model='licExecutorId' label='Исполнитель')
          
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'

const moduleName = 'request'
export default {
  name: 'DecisionInfo',
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request
    }),
    decisionNum: {
      get() {
        return this.request && this.request.decisionNum
      },
      set(value) {
        this.set({ propName: 'decisionNum', propValue: value })
      }
    },
    decisionDate: {
      get() {
        return this.request && this.request.decisionDate
      },
      set(value) {
        this.set({ propName: 'decisionDate', propValue: value })
      }
    },
    licSignerId: {
      get() {
        return this.request && this.request.licSignerId
      },
      set(value) {
        this.set({ propName: 'licSignerId', propValue: value })
      }
    },
    licExecutorId: {
      get() {
        return this.request && this.request.licExecutorId
      },
      set(value) {
        this.set({ propName: 'licExecutorId', propValue: value })
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
