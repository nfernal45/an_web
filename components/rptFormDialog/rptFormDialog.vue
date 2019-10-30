<template lang="pug">
  el-dialog(title="Список доступных печатных форм"
              :visible.sync="dialogIsVisible"
              custom-class='rptFormDialog'
              :before-close="handleClose"
              width="60%")
    div(v-if='rptFormData.length')
      div.list-item.flex.align-center(v-for='item in rptFormData')
        el-icon.el-icon-document(style='margin-right: 5px')
        h6 {{ item.reportName.toUpperCase() }}
    div(v-else) В данном статусе формирование печатных форм не предусмотрено

    span(slot="footer")
      el-button(@click='handleClose') Закрыть
        
</template>

<script>
import { mapState } from 'vuex'
import fetchRptFormList from '@/services/api/requests/fetchRptFormList'
const moduleName = 'request'
export default {
  props: {
    dialogIsVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rptFormData: []
    }
  },
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request
    })
  },
  watch: {
    dialogIsVisible(value) {
      if (value) this.fetchRptFormData()
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async fetchRptFormData() {
      const { typeId, requestStatusId } = this.request
      const response = await fetchRptFormList({
        axiosModule: this.$axios,
        requestTypeId: typeId,
        statusId: requestStatusId
      })
      this.rptFormData = response
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
