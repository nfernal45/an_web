<template lang="pug">
  el-table(:data="computedRequestsList" border style="width: 100%")
    el-table-column(prop="requestDate" label="Дата подачи заявления" width="120")
    el-table-column(prop="regnum" label="Рег. №" width="120")
    el-table-column(prop="licenseeFullname" label="Заявитель")
    el-table-column(prop="addressName" label="Адрес МКД")
    el-table-column(prop="typeId" label="Цель обращения" width="200")
    el-table-column(prop="statusId" label="Статус заявления" width="160")
    el-table-column(fixed="right" label="" width="60")
      template(slot-scope="scope")
        el-button.d-flex.justify-center.align-center(
          type="primary"
          size="small"
          style="width:40px;height:40px;padding:0;"
          @click="openRequest(scope.row.requestId)"
        )
          font-awesome-icon(icon="pen" style="margin:0;")
</template>
<script>
export default {
  name: 'RegistryRequestsTable',
  props: {
    requestsList: {
      type: Array,
      default: () => []
    },
    requestStatusesOptions: {
      type: Array,
      default: () => []
    },
    requestTypesOptions: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    computedRequestsList() {
      return this.requestsList.map((request) => {
        return {
          requestDate: request.requestDate,
          regnum: request.regnum,
          licenseeFullname: request.licenseeFullname,
          addressName: request.addressName,
          typeId: this.requestTypesOptions.find(
            (type) => type.typeId === request.typeId
          ).typeName,
          requestId: request.requestId,
          statusId: this.getStatusNameById(request.requestStatusId)
        }
      })
    }
  },
  methods: {
    openRequest(requestId) {
      this.$router.push({
        name: 'request-id-main',
        params: { id: requestId }
      })
    },
    getStatusNameById(requestStatusId) {
      if (!requestStatusId) {
        return 'Статус неизвестен'
      } else {
        return this.requestStatusesOptions.find(
          (status) => status.statusId === requestStatusId
        ).statusName
      }
    }
  }
}
</script>
<style lang="sass"></style>
