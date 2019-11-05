<template lang="pug">
  div
    el-button(@click='isDrawerVisible = true'
              icon="el-icon-s-operation") Фильтр поиска
    el-button.mb-20(type="success"
                    icon='el-icon-document-add' 
                    @click="createRequest") Создать новое заявление

    el-drawer(title='Фильтр поиска'
              :visible.sync='isDrawerVisible'
              direction='rtl'
              size='35%')
      div(style='padding: 20px')
        el-button(type="primary" 
                  @click="onSearch" 
                  :loading="isSearchLoading"
                  icon='el-icon-search') Поиск
        
        el-form.mt-20(size='small' label-position='top')
          el-row(:gutter='20')
            el-col
              el-divider(content-position="left") One

              el-col(:span='12')
                el-form-item(label='Регистрационный номер заявления')
                  el-input(v-model='searchForm.regnum')
              el-col(:span='12')
                el-form-item(label='Регистрационный номер портала')
                    el-input(v-model='searchForm.outerRegnum')

            el-col
              el-col(:span='12')
                el-form-item(label='ЕНО')
                  el-input(v-model='searchForm.eno')
              el-col(:span='12')
                el-form-item(label='ИНН')
                    el-input(v-model='searchForm.licenseeInn')

          el-row(:gutter='20')
            el-col
              el-form-item(label='Место подачи документов')
                el-checkbox-group.flex.flex-column.justify-start.align-start(v-model='searchForm.regPlaceId')
                    el-checkbox(v-for="item in regPlaceOptions"
                                :key='item.regPlaceId'
                                :label='item.regPlaceId'
                    ) {{ item.regPlaceName }}
          el-row(:gutter='20')
            el-col(:span='12')
              el-form-item(label='Полное наименование заявителя')
                el-input(v-model='searchForm.licenseeFullname')

            el-col
              el-form-item(label='Заявитель') 
                // TODO: not working
                el-checkbox-group.flex.flex-column.justify-start.align-start(v-model='searchForm.regPlaceId')
                    el-checkbox(v-for="item in regPlaceOptions"
                                :key='item.regPlaceId'
                                :label='item.regPlaceId'
                    ) {{ item.regPlaceName }}
          
          el-row
            el-col(:span='6')
              el-form-item(label='Дата подачи заявления')
                el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }'
                v-model='searchForm.requestDate'
                format='dd.MM.yyyy'
              )

    
    
    
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
        regnum: '', // Рег номер заявления
        outerRegnum: '', // Рег номер портала

        eno: '',
        licenseeInn: '',
        regPlaceId: [],
        licenseeFullname: '',
        requestDate: ''
      },
      regPlaceOptions: [],
      applicantOptions: [],
      isDrawerVisible: false
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
