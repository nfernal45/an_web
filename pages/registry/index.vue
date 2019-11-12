<template lang="pug">
  div
    h1 Список заявлений на внесение изменений в реестр лицензий субъекта
    registry-search-form(@onSearch="tablePageChange(1)"
                         @onClearSearchFilter='clearSearchFilter'
                         :search-string.sync='searchString'
                         :isSearchLoading="isSearchLoading").mt-10

    registry-requests-table(
      :isSearchLoading='isSearchLoading'
      :requests-list="requestsList"
      :requestTypesOptions="requestTypesOptions"
      :requestStatusesOptions="requestStatusesOptions"
      :pagination-params.sync='paginationParams'
      @tablePageChange="tablePageChange"
    )
</template>
<script>
import RegistrySearchForm from '@/components/registry/registrySearchForm'
import RegistryRequestsTable from '@/components/registry/registryRequestsTable'
import fetchRequestsList from '@/services/api/requests/fetchRequestsList'
import fetchRequestTypesOptions from '@/services/api/references/fetchRequestTypesOptions'
import fetchRequestStatusesOptions from '@/services/api/references/fetchRequestStatusesOptions'
export default {
  layout: 'registry',
  components: {
    RegistrySearchForm,
    RegistryRequestsTable
  },
  data() {
    return {
      isSearchLoading: false,
      searchParams: {},
      searchString: '',
      requestsList: [],
      requestTypesOptions: [],
      requestStatusesOptions: [],

      paginationParams: {
        limit: 20,
        start: 0,
        total: 0,
        currentPage: 1,
        relate: false
      }
    }
  },
  mounted() {
    this.fetchRequestTypesOptions()
    this.fetchRequestStatusesOptions()
  },
  methods: {
    async searchRequests() {
      this.isSearchLoading = true
      this.searchParams = Object.assign({}, this.paginationParams)
      delete this.searchParams.total
      if (this.searchString.length) this.searchParams.search = this.searchString

      const { data, total } = await fetchRequestsList({
        axiosModule: this.$axios,
        searchParams: this.searchParams
      })

      this.requestsList = data
      this.paginationParams.total = total
      this.isSearchLoading = false
    },
    clearSearchFilter() {
      this.searchString = ''
      this.tablePageChange(1)
    },
    tablePageChange(currentPage) {
      this.paginationParams.currentPage = currentPage
      this.paginationParams.start =
        (this.paginationParams.currentPage - 1) * this.paginationParams.limit

      this.searchRequests()
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
