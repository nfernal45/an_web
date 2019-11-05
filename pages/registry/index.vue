<template lang="pug">
  div
    h1 Список заявлений на внесение изменений в реестр лицензий субъекта
    registry-search-form(@onSearch="searchRequests" :isSearchLoading="isSearchLoading").mt-10
    registry-requests-table(
      :requests-list="requestsList"
      :requestTypesOptions="requestTypesOptions"
      :requestStatusesOptions="requestStatusesOptions"
    )
</template>
<script>
import RegistrySearchForm from '@/components/registry/registrySearchForm'
import RegistryRequestsTable from '@/components/registry/registryRequestsTable'
import fetchRequestsList from '@/services/api/request/fetchRequestsList'
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
      requestsList: [],
      requestTypesOptions: [],
      requestStatusesOptions: []
    }
  },
  mounted() {
    this.fetchRequestTypesOptions()
    this.fetchRequestStatusesOptions()
  },
  methods: {
    async searchRequests(searchParams) {
      this.isSearchLoading = true
      this.requestsList = await fetchRequestsList({
        axiosModule: this.$axios,
        searchParams
      })
      this.isSearchLoading = false
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
