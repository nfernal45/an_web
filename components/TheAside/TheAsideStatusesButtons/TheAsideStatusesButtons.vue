<template lang="pug">
  div(
    id='status-buttons'
    v-show='request.requestId'
    style='margin-top: 40px; min-height: 38px;'
  )
    ul(:class='styles["list"]')
      li(v-for='(button, index) in requestStatuses' :key='index' :class='styles["list-item"]')
        el-button(
          type='warning' 
          plain 
          :class='styles["list-button", "status-button"]'
          @click='onStatusChange(button.statusId)'
        ) {{ button.buttonName }}

</template>
<script>
import { mapState, mapActions } from 'vuex'
import styles from './TheAsideStatusesButtons.module.sass?module'
import { actionTypes as requestActionTypes } from '@/store/types/request'

const moduleName = 'request'

export default {
  name: 'TheAsideStatusesButtons',
  computed: {
    ...mapState({
      request: (state) => state.request.request,
      requestStatuses: (state) => state.request.requestStatuses
    }),
    styles() {
      return styles
    }
  },
  methods: {
    ...mapActions(moduleName, {
      changeRequestStatus: requestActionTypes.CHANGE_REQUEST_STATUS
    }),
    async onStatusChange(nextStatusId) {
      const loading = this.$loading({
        target: '#status-buttons',
        lock: true,
        customClass: this.styles['el-loading-mask']
      })
      await this.changeRequestStatus(nextStatusId)
      loading.close()
    }
  }
}
</script>
