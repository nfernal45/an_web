<template lang="pug">
  div(v-show='appeal.requestId'
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
import { actionTypes as appealActionTypes } from '@/store/types/appeal'

const moduleName = 'appeal'

export default {
  name: 'TheAsideStatusesButtons',
  data() {
    return {
      isStatusesButtonsLoading: false
    }
  },
  computed: {
    ...mapState({
      appeal: (state) => state.appeal.appeal,
      requestStatuses: (state) => state.appeal.requestStatuses
    }),
    styles() {
      return styles
    }
  },
  methods: {
    ...mapActions(moduleName, {
      fetchAppealById: appealActionTypes.FETCH_APPEAL
    }),
    async changeRequestStatus(nextStatusId) {
      this.isStatusesButtonsLoading = true
      await changeRequestStatus({
        axiosModule: this.$axios,
        requestId: this.appeal.requestId,
        nextStatusId,
        requestStatusId: this.appeal.requestStatusId
      })
      await this.fetchAppealById(this.appeal.requestId)
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
