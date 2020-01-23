<template lang="pug">
  el-row
    el-col
      el-pagination.mb-10(layout="prev, pager, next, slot"
                          background
                          :disabled='isSearchLoading'
                          :page-size="paginationParams.limit"
                          :total="paginationParams.total"
                          :current-page='paginationParams.currentPage'
                          class="mb-15"
                          @current-change="tablePageChange")
        span Найдено заявлений: {{ paginationParams.total }}
    el-col(v-loading='isSearchLoading')
      el-table(:data="computedRequestsList" 
               style="width: 100%")
        el-table-column(label="Рег. №" width="120")
          template(slot-scope='scope')
            span {{ scope.row.regnum }}  {{ scope.row.outerRegnum }}

        el-table-column(prop="requestDate" label="Дата подачи заявления" width="115")
        el-table-column(prop="planConsidDate" label="Плановая дата рассмотрения" width="100")
        
        el-table-column(label="Заявитель")
          template(slot-scope='scope')
            span {{ scope.row.licenseeShortname }} / {{ scope.row.licenseeInn }}

        el-table-column(label="Адрес МКД")
          template(slot-scope='scope')
            span {{ computedRequestAddress(scope.row.addressId) }}
        el-table-column(prop="typeId" label="Цель обращения" width="200")
        el-table-column(label="Статус заявления" width="160")
          template(slot-scope='scope')
            span {{ scope.row.statusId }}
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
import fetchRefAddressList from '@/services/api/references/fetchRefAddressList'
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
      requestsAddressList: [],
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
          planConsidDate: request.planConsidDate,
          regnum: request.regnum,
          outerRegnum: request.outerRegnum,
          licenseeShortname: request.licenseeShortname,
          addressId: request.addressId,
          licenseeInn: request.licenseeInn,
          typeId: this.requestTypesOptions.find(
            (type) => type.typeId === request.typeId
          ).typeName,
          requestId: request.requestId,
          statusId: this.getStatusNameById(request.requestStatusId)
        }
      })
    },
    computedRequestAddress() {
      return (addressId) => {
        const result = this.requestsAddressList.find(
          (item) => item.addressId === addressId
        )

        if (result) return result.fullAddress
        else return ''
      }
    }
  },
  watch: {
    globalSearchFilters(value) {
      this.searchString = value
      this.tablePageChange(1)
    },
    requestsList(value) {
      const requestsIdArray = []

      for (const item of this.requestsList)
        if (item.addressId) requestsIdArray.push(item.addressId)

      const search = `addressId=in=(${requestsIdArray.join(',')})`
      if (requestsIdArray.length) this.fetchRefAddressList(search)
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

      if (this.globalSearchFilters.length)
        searchParams.search = this.globalSearchFilters

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
    },
    async fetchRefAddressList(search) {
      const { data } = await fetchRefAddressList({
        axiosModule: this.$axios,
        search
      })

      this.requestsAddressList = data
    }
  }
}
</script>
<style lang="sass"></style>
