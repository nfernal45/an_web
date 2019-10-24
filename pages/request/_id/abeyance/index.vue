<template lang="pug">
  div.request-abeyance
    el-row
     el-col(v-for="abeyance in gfAbeyancesByRequestId" :key="abeyance.abeyanceId")
      // Приостановление решения заявления
      abeyance-decision
    
</template>
<script>
import { mapState, mapActions } from 'vuex'
import abeyanceDecision from '@/components/request/abeyance/abeyanceDecision'
import { actionTypes as requestActionTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'RequestabeyancePage',
  components: {
    abeyanceDecision
  },
  computed: {
    ...mapState({
      gfAbeyancesByRequestId: (state) =>
        state.request.request.gfAbeyancesByRequestId
    }),

    isAbeaynceExist() {
      return this.gfAbeyancesByRequestId && !!this.gfAbeyancesByRequestId.length
    }
  },
  mounted() {
    if (!this.isAbeaynceExist) this.createAbeyance()
  },
  methods: {
    ...mapActions(moduleName, {
      createAbeyance: requestActionTypes.CREATE_ABEYANCE
    })
  }
}
</script>
<style lang="sass"></style>
