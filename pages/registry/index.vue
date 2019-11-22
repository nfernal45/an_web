<template lang="pug">
  div
    h1 Список заявлений на внесение изменений в реестр лицензий субъекта
    registry-search-form(@changeSearchFilters="changeGlobalSearchFilters"
                         :globalSearchFilters='globalSearchFilters'
                         :isSearchLoading="isSearchLoading").mt-10.mb-10

    registry-requests-table(
      :globalSearchFilters='globalSearchFilters'
      :isSearchLoading.sync='isSearchLoading'
    )
</template>
<script>
import RegistrySearchForm from '@/components/registry/registrySearchForm'
import RegistryRequestsTable from '@/components/registry/registryRequestsTable'

export default {
  layout: 'registry',
  components: {
    RegistrySearchForm,
    RegistryRequestsTable
  },
  data() {
    return {
      isSearchLoading: false,
      globalSearchFilters: ''
    }
  },
  methods: {
    changeGlobalSearchFilters(value) {
      this.globalSearchFilters = value
    }
  }
}
</script>
<style lang="sass"></style>
