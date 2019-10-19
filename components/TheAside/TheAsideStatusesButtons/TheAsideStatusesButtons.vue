<template lang="pug">
  div(v-loading='isStatusesButtonsLoading' style="margin-top: 40px; min-height: 38px;")
    ul(:class="styles['list']")
      li(v-for="(button, index) in nextStatuses" :key="index" :class="styles['list-item']")
        el-button(type="warning" plain :class="styles['list-button']" @click="changeStatus(button.statusId)") {{ getButtonStatusName(button.statusId) }}

</template>
<script>
// import { Loading } from 'element-ui'
import { mapState, mapActions } from 'vuex'
import styles from '../TheAside.module.sass?module'
import getNextStatuses from '@/services/api/requests/getNextAppealStatuses'
import changeStatuses from '@/services/api/requests/changeAppealStatuses'
import { actionTypes as appealActionTypes } from '@/store/types/appeal'

export default {
  name: 'TheAsideStatusesButtons',
  data() {
    return {
      isStatusesButtonsLoading: false,
      nextStatuses: []
    }
  },
  computed: {
    ...mapState({
      requestStatusId: (state) => state.appeal.appeal.requestStatusId
    }),
    styles() {
      return styles
    },
    requestId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.fetchNextStatuses()
  },
  methods: {
    ...mapActions('appeal', {
      fetchAppealById: appealActionTypes.FETCH_APPEAL
    }),
    async changeStatus(nextStatusId) {
      if (!this.requestId || !this.requestStatusId) {
        this.$notify.warning({
          title: 'Внимание',
          message: 'В заявлении отсутсвует статус.'
        })

        return false
      }

      this.isStatusesButtonsLoading = true

      try {
        const { data } = await changeStatuses(
          this.$axios,
          this.requestId,
          nextStatusId,
          this.requestStatusId
        )

        this.isStatusesButtonsLoading = false

        await this.fetchAppealById(this.requestId)
        await this.fetchNextStatuses()

        this.$notify.success({
          title: 'Успех',
          offset: 180,
          message: `Текущий статус изменён на "${data.statusName}".`
        })
      } catch (e) {
        this.isStatusesButtonsLoading = false
        this.$notify.error({
          offset: 180,
          title: 'Внимание',
          message: 'При работе системы произошла ошибка.'
        })
      }
    },
    async fetchNextStatuses() {
      this.isStatusesButtonsLoading = true

      try {
        const { data } = await getNextStatuses(this.$axios, this.requestId)

        this.nextStatuses = data
        this.isStatusesButtonsLoading = false

        return Promise.resolve()
      } catch (e) {
        this.isStatusesButtonsLoading = false

        this.$notify.error({
          title: 'Внимание',
          offset: 180,
          message: 'При работе системы возникла ошибка.'
        })

        return Promise.reject(e)
      }
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
