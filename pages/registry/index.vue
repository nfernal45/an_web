<template lang="pug">
  div
    h1 Список заявлений на внесение изменений в реестр лицензий субъекта
    registry-search-form(@changeSearchFilters="setGlobalSearchFilters"
                         :isSearchLoading="isSearchLoading").mt-10.mb-10
    registry-requests-table(
      :globalSearchFilters='getGlobalSearchFilters'
      :isSearchLoading.sync='isSearchLoading'
    )
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/references'
import RegistrySearchForm from '@/components/registry/registrySearchForm'
import RegistryRequestsTable from '@/components/registry/registryRequestsTable'

const referencesModuleName = 'references'

export default {
  layout: 'registry',
  components: {
    RegistrySearchForm,
    RegistryRequestsTable
  },
  data() {
    return {
      isSearchLoading: false
    }
  },
  computed: {
    ...mapState(referencesModuleName, {
      getGlobalSearchFilters: (state) => state.globalSearchFilters
    })
  },
  methods: {
    ...mapMutations(referencesModuleName, {
      setGlobalSearchFilters: mutationTypes.SET_GLOBAL_SEARCH_FILTERS
    })
  }
}
</script>
<style lang="sass"></style>
