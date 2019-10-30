<template lang="pug">
  div(v-show='request.requestId'
      v-loading='isStatusesButtonsLoading' 
      style='margin-top: 40px; min-height: 38px;')
    ul(:class='styles["list"]')
      li(v-for='(button, index) in requestStatuses' :key='index' :class='styles["list-item"]')
        el-button(type='warning' 
                  plain 
                  :class='styles["list-button", "status-button"]' @click='onStatusChange(button.statusId)') {{ button.buttonName }}

</template>
<script>
import { mapState, mapActions } from 'vuex'
import styles from '../TheAside.module.sass?module'
import { actionTypes as requestActionTypes } from '@/store/types/request'

const moduleName = 'request'

export default {
  name: 'TheAsideStatusesButtons',
  data() {
    return {
      isStatusesButtonsLoading: false
    }
  },
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
      fetchRequestById: requestActionTypes.FETCH_REQUEST,
      changeRequestStatus: requestActionTypes.CHANGE_REQUEST_STATUS
    }),
    async onStatusChange(nextStatusId) {
      this.isStatusesButtonsLoading = true
      await this.changeRequestStatus(nextStatusId)
      this.isStatusesButtonsLoading = false
    }
  }
}
</script>
