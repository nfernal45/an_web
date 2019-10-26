<template lang="pug">
  div
    el-button(type="primary" @click="onSearch" :loading="isSearchLoading") Поиск
    el-button(type="success" @click="createRequest") Создать новое заявление
    el-form.mt-20(size='small' label-position='top')
      el-row.mb-20(:gutter='20')
        el-col(:span='6')
          el-form-item(label='ЕНО')
            el-input(v-model='searchForm.eno')
        el-col(:span='6')
          el-form-item(label='ИНН')
            el-input(v-model='searchForm.licenseeInn')
      
      el-row.mb-20
        el-col

          el-form-item(label='Место подачи документов')
            el-checkbox-group.flex.flex-column.justify-start.align-start(v-model='searchForm.regPlaceId')
                el-checkbox(v-for="item in regPlaceOptions"
                            :key='item.regPlaceId'
                            :label='item.regPlaceId'
                ) {{ item.regPlaceName }}
      el-row.mb-20
        el-col(:span='12')
          el-form-item(label='Полное наименование заявителя')
            el-input(v-model='searchForm.licenseeFullname')
      
      el-row.mb-20
        el-col(:span='6')
          el-form-item(label='Дата подачи заявления')
            el-date-picker(v-model='searchForm.requestDate' format='dd.MM.yyyy')
</template>
<script>
import fetchRegPlaceOptions from '@/services/api/references/fetchRegPlaceOptions'
import { dateToString, stringToDate } from '@/services/date-parser'
export default {
  name: 'RegistrySearchForm',
  props: {
    isSearchLoading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      searchForm: {
        eno: '',
        licenseeInn: '',
        regPlaceId: [],
        licenseeFullname: '',
        requestDate: ''
      },
      regPlaceOptions: []
    }
  },
  computed: {
    searchParams() {
      const params = {
        limit: 20,
        relate: false
      }
      const search = []
      if (this.searchForm.eno.length)
        search.push(`eno=="*${this.searchForm.eno}*"`)
      if (this.searchForm.licenseeInn.length)
        search.push(`licenseeInn=='${this.searchForm.licenseeInn}'`)
      if (this.searchForm.regPlaceId.length)
        search.push(`regPlaceId=in=(${this.searchForm.regPlaceId.join(',')})`)
      if (this.searchForm.licenseeFullname)
        search.push(`licenseeFullname=='*${this.searchForm.licenseeFullname}*'`)
      if (this.computedRequestDate)
        search.push(`requestDate=="${this.searchForm.computedRequestDate}"`)

      if (search.length) {
        params.search = search.join(';')
      }

      return params
    },
    computedRequestDate: {
      get() {
        return stringToDate(this.requestDate)
      },
      set(value) {
        this.requestDate = dateToString(value)
      }
    }
  },
  mounted() {
    this.fetchRegPlaceOptions()
  },
  methods: {
    createRequest() {
      this.$router.push({ name: 'request-id-main', params: { id: 'create' } })
    },
    onSearch() {
      this.$emit('onSearch', this.searchParams)
    },
    async fetchRegPlaceOptions() {
      this.regPlaceOptions = await fetchRegPlaceOptions({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
<style lang="sass"></style>
