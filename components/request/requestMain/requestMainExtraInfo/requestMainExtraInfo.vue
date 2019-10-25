<template lang="pug">
  form-block.mb-10(title='Дополнительные сведения')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row
          el-col(:span="14")
            el-form-item(label='Основания заключения, прекращения или расторжения договора')
              el-select.width-100(
                v-model='agreementFoundationId'
                size='small'
                placeholder='Укажите основание'
              )
                el-option(v-for='item in agreementFoundationOptions'
                  :key='item.decisionIssueMethodId'
                  :label='item.decisionIssueMethodName'
                  :value='item.decisionIssueMethodId')

        el-form-item(label='У организации происходит реорганизация')
          el-radio-group(v-model='isReorg')
            el-radio(
              v-for='item in isReorgOptions'
              :key='item.id'
              :label='item.id'
              style='margin-bottom: 5px'
            ) {{ item.name }}
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'RequestMainExtraInfo',
  data() {
    return {
      agreementFoundationOptions: [],
      isReorgOptions: [
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
    ...mapState({
      request: (state) => state.request.request
    }),

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
