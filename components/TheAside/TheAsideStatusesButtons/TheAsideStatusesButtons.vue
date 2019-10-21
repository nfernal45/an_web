<template lang="pug">
  div(v-show='request.requestId'
      v-loading='isStatusesButtonsLoading' 
      style='margin-top: 40px; min-height: 38px;')
    ul(:class='styles["list"]')
      li(v-for='(button, index) in requestStatuses' :key='index' :class='styles["list-item"]')
        el-button(type='warning' plain :class='styles["list-button"]' @click='changeRequestStatus(button.statusId)') {{ getButtonStatusName(button.statusId) }}

</template>
<script>
import { mapState, mapActions } from 'vuex'
import styles from '../TheAside.module.sass?module'
import changeRequestStatus from '@/services/api/requests/changeRequestStatus'
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
      fetchRequestById: requestActionTypes.FETCH_APPEAL
    }),
    async changeRequestStatus(nextStatusId) {
      this.isStatusesButtonsLoading = true
      await changeRequestStatus({
        axiosModule: this.$axios,
        requestId: this.request.requestId,
        nextStatusId,
        requestStatusId: this.request.requestStatusId
      })
      await this.fetchRequestById(this.request.requestId)
      this.isStatusesButtonsLoading = false
    },
    getButtonStatusName(statusId) {
      switch (statusId) {
        case 1:
          return ''
        case 2:
          return 'Зарегистрировать'
        case 3:
          return 'Запросить документы'
        case 4:
          return 'Сведения получены'
        case 5:
          return 'Анализ документов'
        case 6:
          return 'Приостановить'
        case 7:
          return 'Возобновить'
        case 8:
          return 'Запросить доп. документы'
        case 9:
          return 'Доп. сведения получены'
        case 10:
          return 'Анализ документов'
        case 11:
          return 'Решение оформлено'
        case 12:
          return 'Решение принято'
        case 13:
          return 'Доп. сведения получены'
      }
    }
  }
}
</script>
