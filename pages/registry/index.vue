<template lang="pug">
  div
    h1 Список заявлений на внесение изменений в реестр лицензий субъекта
    registry-search-form(@onSearch="searchRequests" :isSearchLoading="isSearchLoading").mt-10
</template>
<script>
import RegistrySearchForm from '@/components/registry/registrySearchForm'
import fetchRequestsList from '@/services/api/requests/fetchRequestsList'
export default {
  layout: 'registry',
  components: {
    RegistrySearchForm
  },
  data() {
    return {
      isSearchLoading: false
    }
  },
  methods: {
    async searchRequests(searchParams) {
      this.isSearchLoading = true
      this.requestsList = await fetchRequestsList({
        axiosModule: this.$axios,
        searchParams
      })
      this.isSearchLoading = false
    }
  }
}
</script>
<style lang="sass"></style>
