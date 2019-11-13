<template lang="pug">
  el-row
    el-col
      el-pagination.mb-10(layout="prev, pager, next, total"
                          background
                          :disabled='isSearchLoading'
                          :page-size="paginationParams.limit"
                          :total="paginationParams.total"
                          :current-page='paginationParams.currentPage'
                          class="mb-15"
                          @current-change="tablePageChange")
    el-col(v-loading='isSearchLoading')
      el-table(:data="computedRequestsList" 
               style="width: 100%")
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
import fetchRequestsList from '@/services/api/request/fetchRequestsList'
import fetchRequestTypesOptions from '@/services/api/references/fetchRequestTypesOptions'
import fetchRequestStatusesOptions from '@/services/api/references/fetchRequestStatusesOptions'
export default {
  name: 'RegistryRequestsTable',
  props: {
    globalSearchFilters: {
      type: String,
      default: ''
    },
    isSearchLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      searchString: '',
      requestsList: [],
      requestTypesOptions: [],
      requestStatusesOptions: [],

      paginationParams: {
        limit: 10,
        start: 0,
        total: 0,
        sort: 'requestId-',
        currentPage: 1,
        relate: false
      }
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
  watch: {
    globalSearchFilters(value) {
      this.searchString = value
      this.tablePageChange(1)
    }
  },
  mounted() {
    this.fetchRequestTypesOptions()
    this.fetchRequestStatusesOptions()
    this.tablePageChange(1)
  },
  methods: {
    async searchRequests() {
      this.$emit('update:isSearchLoading', true)

      const searchParams = Object.assign({}, this.paginationParams)
      delete searchParams.total

      if (this.searchString.length) searchParams.search = this.searchString

      const { data, total } = await fetchRequestsList({
        axiosModule: this.$axios,
        searchParams
      })

      this.requestsList = data
      this.paginationParams.total = total
      this.$emit('update:isSearchLoading', false)
    },
    tablePageChange(currentPage) {
      this.paginationParams.currentPage = currentPage
      this.paginationParams.start =
        (this.paginationParams.currentPage - 1) * this.paginationParams.limit

      this.searchRequests()
    },
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
    },
    async fetchRequestTypesOptions() {
      this.requestTypesOptions = await fetchRequestTypesOptions({
        axiosModule: this.$axios
      })
    },
    async fetchRequestStatusesOptions() {
      this.requestStatusesOptions = await fetchRequestStatusesOptions({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
<style lang="sass"></style>
