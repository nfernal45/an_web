<template lang="pug">
  form-block(title='Уведомление')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row.mb-20(:gutter='20')
          el-col
            el-col(:span='6')
              el-radio(v-model='decisionType' label='D') О внесении изменений
            el-col(:span='6')
              el-radio(v-model='decisionType' label='R') Отказ
        
        el-row(:gutter='20')
          el-col(v-show='decisionType === "D"')
            div {{ getTheRightReason }}
          
          el-col(v-show='decisionType === "R"')
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
  data() {
    return {
      refAcceptReasons: [],
      refRefusalReasons: [],
      selectValue: []
    }
  },
  computed: {
    ...mapState(moduleName, {
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
    decisionType: {
      get() {
        return this.request && this.request.decisionType
      },
      set(value) {
        this.set({ propName: 'decisionType', propValue: value })
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
