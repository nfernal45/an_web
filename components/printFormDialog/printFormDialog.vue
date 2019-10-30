<template lang="pug">
  el-dialog(title="Список доступных печатных форм"
            :visible.sync="isDialogVisible"
            custom-class='rptFormDialog'
            :before-close="handleClose"
            :destroy-on-close='true'
            :close-on-click-modal='false'
            append-to-body
            width="50%")
    div(v-if='printFormData.length')
      div(v-for='item in printFormData'
          @click='openRptForm(item)'
         )
        div.list-item.flex.align-center(v-if='isRptLinkVisible(item)')
          el-icon.el-icon-document(style='margin-right: 5px')
          h6 {{ item.refReportFormByReportFormId.reportName.toUpperCase() }}
    div.flex.align-center(v-else style='opacity: 0.5')
      h4 В данном статусе формирование печатных форм не предусмотрено

    span(slot="footer")
      el-button(@click='handleClose') Закрыть
        
</template>

<script>
// rptFormDialog
import { mapState } from 'vuex'
import fetchRptFormList from '@/services/api/requests/fetchRptFormList'
import fetchSettings from '@/services/api/settings/fetchSettings'
const moduleName = 'request'
export default {
  props: {
    isDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      printFormData: [],
      systemSettings: null
    }
  },
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request
    }),
    isRptLinkVisible() {
      return (item) => {
        const status = this.request.requestStatusId
        if (status === 6 || status === 7) {
          if (item.decisionType) {
            if (item.decisionType === this.request.decisionType) return true
            else return false
          } else return true
        } else return true
      }
    }
  },
  watch: {
    isDialogVisible(value) {
      if (value) this.fetchRptFormData()
    }
  },
  async mounted() {
    const settingId = 'RL_BIP_HOST_PORT'
    this.systemSettings = await fetchSettings({
      axiosModule: this.$axios,
      query: [settingId]
    })
  },
  methods: {
    handleClose(closeMessage = '') {
      this.$emit('close')

      if (closeMessage.length) {
        this.$notify.warning({
          title: 'Внимание',
          message: closeMessage
        })
      }
    },
    async fetchRptFormData() {
      const { typeId, requestStatusId } = this.request

      if (!typeId || !requestStatusId)
        return this.handleClose('Повторите попытку.')

      const response = await fetchRptFormList({
        axiosModule: this.$axios,
        requestTypeId: typeId,
        statusId: requestStatusId
      })
      this.printFormData = response
    },
    openRptForm(item) {
      const host =
        this.systemSettings.length && this.systemSettings[0].settingValString
      const link = `${host}${item.refReportFormByReportFormId.urlSuffix.replace(
        '<%REQUEST_ID%>',
        `${this.request.requestId}`
      )}`
      window.open(link)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-item {
  padding: 8px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: rgb(152, 217, 255);
    // color: white;
  }
  &:active {
    background-color: rgb(115, 200, 250);
  }
}
</style>
