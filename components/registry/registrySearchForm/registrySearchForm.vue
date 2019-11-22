<template lang="pug">
  div
    el-button.mb-20(type="success"
                    icon='el-icon-document-add' 
                    @click="createRequest") Создать новое заявление
    el-button(@click='isDrawerVisible = true'
              icon="el-icon-s-operation") Показать фильтр

    el-drawer(title='Фильтр поиска'
              :visible.sync='isDrawerVisible'
              :wrapperClosable='false'
              direction='rtl'
              size='55%')
      div(style='padding: 0px 20px 20px 20px')
        el-button(type="primary" 
                  @click="onSearch" 
                  :loading="isSearchLoading"
                  :disabled='requestsCount || errorAddressMessage.length'
                  icon='el-icon-search') {{ requestsCount ? 'Пожалуйста, подождите...' : 'Поиск' }}
        el-button(type="warning" 
                  @click="clearSearchFilter"
                  icon='el-icon-circle-close') Очистить поиск
        
        el-form.mt-20(size='mini' label-position='top')
          el-row
            el-row
                  el-col(:span='18')
                    el-divider(content-position="left") Заявление
            el-col(:span='15')
              el-row(:gutter='20')
                el-col(:span='6')
                  el-form-item(label='Рег.№')
                    el-input(v-model='searchForm.regnum')
                el-col(:span='6')
                  el-form-item(label='Рег.№ портала')
                      el-input(v-model='searchForm.outerRegnum')
                el-col(:span='10')
                  el-form-item(label='ЕНО')
                    el-input(v-model='searchForm.eno')

              el-row(:gutter='20')
                el-col(:span='22')
                  el-form-item(label='Место подачи документов')
                    el-checkbox-group.flex.justify-start.align-start(v-model='searchForm.regPlaceId')
                        el-checkbox(v-for="item in regPlaceOptions"
                                    :key='item.regPlaceId'
                                    :label='item.regPlaceId'
                        ) {{ item.regPlaceName }}
              
              el-row
                el-col(:span='11')
                  el-form-item(label='Дата получения в МЖИ')
                    span(style='margin-right: 10px') с
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='searchForm.requestDate.start'
                      placeholder='Выберите дату'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                    )
                el-col(:span='11')
                  el-form-item(label=' ')
                    span(style='margin-right: 10px') по
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='searchForm.requestDate.end'
                      placeholder='Выберите дату'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                    )

              el-row
                el-col(:span='11')
                  el-form-item(label='Дата подачи на портале')
                    span(style='margin-right: 10px') с
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='searchForm.outerRequestDate.start'
                      placeholder='Выберите дату'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                    )
                el-col(:span='11')
                  el-form-item(label=' ')
                    span(style='margin-right: 10px') по
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='searchForm.outerRequestDate.end'
                      placeholder='Выберите дату'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                    )

              el-row
                el-col(:span='11')
                  el-form-item(label='Плановый срок оказания ГУ')
                    span(style='margin-right: 10px') с
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='searchForm.planConsidDate.start'
                      placeholder='Выберите дату'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                    )
                el-col(:span='11')
                  el-form-item(label=' ')
                    span(style='margin-right: 10px') по
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='searchForm.planConsidDate.end'
                      placeholder='Выберите дату'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                    )
                      

            el-col(:span='8')
              el-form-item(label='Тип обращения')
                el-select(v-model='searchForm.typeId'
                          clearable
                          filterable
                          multiple
                          style='width: 320px'
                          )
                  el-option(v-for="item in computedRefRequestTypes"
                            :key='item.typeId'
                            :label='item.typeName'
                            :value='item.typeId')
              el-form-item(label='Статус заявления')
                el-select(v-model='searchForm.requestStatusesId'
                          clearable
                          filterable
                          multiple
                          style='width: 320px'
                          )
                  el-option(v-for='item in refRequestStatusesOptions'
                            :key='item.statusId'
                            :label='item.statusName'
                            :value='item.statusId')
                  
          
          el-row(:gutter='20')
            el-row
              el-col(:span='18')
                el-divider(content-position="left") Адрес МКД
            el-col(:span='24') 
              el-tag(v-show='errorAddressMessage.length'
                    type='danger'
                    size='small') {{ errorAddressMessage }}
            el-col(:span='3')
              el-form-item(label='Округ')
                el-select(v-model='searchAddress.admDisctrict'
                          filterable
                          clearable)
                  el-option(v-for='item in refAdmDisctricts'
                            :key='item.admDistrictId'
                            :label='item.shortNameAdmDistr'
                            :value='item.admDistrictId')

            el-col(:span='5')
              el-form-item(label='Район')
                el-select(v-model='searchAddress.district'
                          :loading='isDistrictSelectLoading'
                          :filterable='!isDistrictSelectLoading'
                          clearable
                          remote
                          :remote-method='fetchRefDisctricts')
                  el-option(v-for='item in refDistricts' 
                            :key='item.districtId'
                            :label='item.districtName'
                            :value='item.districtId')

            el-col(:span='5')
              el-form-item(label='Улица')
                el-select(v-model='searchAddress.street'
                          :loading='isStreetsSelectLoading'
                          :filterable='!isStreetsSelectLoading'
                          remote
                          :remote-method='fetchStreets'
                          clearable)
                  el-option(v-for='item in refStreets'
                            :key='item.streetId'
                            :label='item.streetName'
                            :value='item.streetId')

            el-col(:span='3')
              el-form-item(label='Дом')
                el-input(v-model='searchAddress.house' clearable)
            
            el-col(:span='3')
              el-form-item(label='Корпус')
                el-input(v-model='searchAddress.corp' clearable)
            
            el-col(:span='3')
              el-form-item(label='Строение')
                el-input(v-model='searchAddress.constr' clearable)

          el-row(:gutter='20')
            el-row
                el-col(:span='18')
                  el-divider(content-position="left") Заявитель
            
            el-col(:span='6')
              el-form-item(label='Тип заявителя')
                  el-checkbox-group.flex.justify-start.align-start(v-model='searchForm.licenseeType')
                    el-checkbox(label='L') Юридическое лицо
                    el-checkbox(label='I') ИП

            el-col(:span='5')
              el-form-item(label='ИНН')
                  el-input(v-model='searchForm.licenseeInn')

            el-col(:span='11')
              el-form-item(label='Наименование')
                  el-input(v-model='searchForm.licenseeName')
          
</template>
<script>
import fetchRegPlaceOptions from '@/services/api/references/fetchRegPlaceOptions'
import fetchRefAdmDisctricts from '@/services/api/references/fetchRefAdmDisctricts'
import fetchRefDisctricts from '@/services/api/references/fetchRefDisctricts'
import fetchStreets from '@/services/api/references/fetchStreets'
import fetchRefAddress from '@/services/api/references/fetchRefAddress'
import fetchRequestTypesOptions from '@/services/api/references/fetchRequestTypesOptions'
import fetchRequestStatusesOptions from '@/services/api/references/fetchRequestStatusesOptions'

export default {
  name: 'RegistrySearchForm',
  props: {
    isSearchLoading: {
      type: Boolean,
      default: () => false
    },
    globalSearchFilters: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchForm: {
        regnum: '', // Рег номер заявления
        outerRegnum: '', // Рег номер портала
        addressesId: [],
        licenseeType: [],
        requestStatusesId: [],
        licenseeName: '', // Если тип заявителя ЮЛ, то записывать данные в licenseeFullname, если ИП то в licenseeShortname

        eno: '',
        licenseeInn: '',
        typeId: [],
        regPlaceId: [],
        requestDate: {
          start: '',
          end: ''
        },
        outerRequestDate: {
          start: '',
          end: ''
        },
        planConsidDate: {
          start: '',
          end: ''
        }
      },
      searchAddress: {
        admDisctrict: '', // Округ
        district: '',
        street: '', // Улица
        corp: '', // Корпус
        constr: '', // Строение
        house: '' // Номер дома
      },
      cleanSearchAddress: {},
      cleanSearchForm: {},
      errorAddressMessage: '',
      regPlaceOptions: [],
      refAdmDisctricts: [],
      refDistricts: [],
      refStreets: [],
      refRequestTypes: [],
      refRequestStatusesOptions: [],
      applicantOptions: [],

      isDrawerVisible: false,
      isDistrictSelectLoading: false,
      isStreetsSelectLoading: false,
      isSearchButtonDisabled: false,
      requestsCount: 0
    }
  },
  computed: {
    searchParams() {
      let search = []

      if (this.searchForm.eno.length)
        search.push(`eno==*${this.searchForm.eno}*`)

      if (this.searchForm.regnum.length)
        search.push(`regnum==${this.searchForm.regnum}`)

      if (this.searchForm.outerRegnum.length)
        search.push(`outerRegnum==${this.searchForm.outerRegnum}`)

      if (this.searchForm.licenseeInn.length)
        search.push(`licenseeInn=='${this.searchForm.licenseeInn}'`)

      if (this.searchForm.regPlaceId.length)
        search.push(`regPlaceId=in=(${this.searchForm.regPlaceId.join(',')})`)

      if (this.searchForm.licenseeName.length)
        search.push(
          `licenseeFullname=='*${this.searchForm.licenseeName.replace(
            `'`,
            `"`
          )}*' or licenseeShortname=='*${this.searchForm.licenseeName.replace(
            `'`,
            `"`
          )}*'`
        )

      if (this.searchForm.requestDate.start)
        search.push(
          `requestDate>="${this.searchForm.requestDate.start}T00:00:00"`
        )

      if (this.searchForm.requestDate.end)
        search.push(
          `requestDate<="${this.searchForm.requestDate.end}T23:59:59"`
        )

      if (this.searchForm.planConsidDate.start)
        search.push(
          `planConsidDate>="${this.searchForm.planConsidDate.start}T00:00:00"`
        )

      if (this.searchForm.planConsidDate.end)
        search.push(
          `planConsidDate<="${this.searchForm.planConsidDate.end}T23:59:59"`
        )

      if (this.searchForm.outerRequestDate.start)
        search.push(
          `outerRequestDate>="${this.searchForm.outerRequestDate.start}T00:00:00"`
        )

      if (this.searchForm.outerRequestDate.end)
        search.push(
          `outerRequestDate<="${this.searchForm.outerRequestDate.end}T23:59:59"`
        )

      if (this.searchForm.requestStatusesId.length)
        search.push(`requestStatusId=in=(${this.searchForm.requestStatusesId})`)

      if (this.searchForm.typeId.length)
        search.push(`typeId=in=(${this.searchForm.typeId.join(',')})`)

      if (this.computedAddressesId.length)
        search.push(`addressId=in=(${this.searchForm.addressesId.join(',')})`)

      if (this.searchForm.licenseeType.length)
        search.push(`licenseeType=in=(${this.searchForm.licenseeType})`)

      if (search.length) search = search.join(';')
      else search = ''

      return search
    },
    computedAddressesId() {
      if (
        !this.searchAddress.admDisctrict &&
        !this.searchAddress.district &&
        !this.searchAddressconstr &&
        !this.searchAddress.corp &&
        !this.searchAddress.house &&
        !this.searchAddress.street
      )
        return []
      else return this.searchForm.addressesId
    },
    computedRefRequestTypes() {
      return (
        this.refRequestTypes &&
        this.refRequestTypes.filter((item) => {
          return item.isGf === 'Y'
        })
      )
    }
  },
  watch: {
    // searchForm: {
    //   handler(value) {
    //     sessionStorage.setItem('searchAddressFilter', JSON.stringify(value))
    //   },
    //   deep: true
    // },
    searchAddress: {
      handler(value) {
        this.fetchRefAddress()

        // sessionStorage.setItem('searchFormFilter', JSON.stringify(value))
      },
      deep: true
    }
  },
  mounted() {
    this.fetchRegPlaceOptions()
    this.fetchRefAdmDisctricts()
    this.fetchStreets()
    this.fetchRequestTypesOptions()
    this.fetchRequestStatusesOptions()

    this.cleanSearchForm = Object.assign({}, { ...this.searchForm })
    this.cleanSearchAddress = Object.assign({}, { ...this.searchAddress })

    // const searchFormFilter = sessionStorage.getItem('searchFormFilter')
    // const searchAddressFilter = sessionStorage.getItem('searchAddressFilter')

    // if (searchFormFilter) this.searchForm = JSON.parse(searchFormFilter)
    // if (searchAddressFilter) this.searchAddress = JSON.parse(searchAddressFilter)

    // if (searchFormFilter || searchAddressFilter) this.onSearch(true)
    // else this.onSearch()
  },
  methods: {
    createRequest() {
      this.$router.push({ name: 'request-id-main', params: { id: 'create' } })
    },
    onSearch(empty = false) {
      this.$emit('changeSearchFilters', this.searchParams)
    },
    clearSearchFilter() {
      this.searchForm = Object.assign({}, { ...this.cleanSearchForm })
      this.searchAddress = Object.assign({}, { ...this.cleanSearchAddress })

      const willBeClearFields = []

      Object.keys(this.searchForm).forEach((key) => {
        const clearingKeyItem = key.includes('Date') ? key : ''

        if (clearingKeyItem.length) willBeClearFields.push(clearingKeyItem)
      })

      willBeClearFields.forEach((key) => {
        this.searchForm[key].start = ''
        this.searchForm[key].end = ''
      })

      this.$emit('changeSearchFilters', '')
    },
    async fetchRegPlaceOptions() {
      this.regPlaceOptions = await fetchRegPlaceOptions({
        axiosModule: this.$axios
      })
    },
    async fetchRefAdmDisctricts() {
      this.requestsCount++
      this.refAdmDisctricts = await fetchRefAdmDisctricts({
        axiosModule: this.$axios
      })
      this.requestsCount--
    },
    async fetchRefDisctricts(query) {
      if (query.length < 2) return false

      this.isDistrictSelectLoading = true
      this.requestsCount++

      this.refDistricts = await fetchRefDisctricts({
        axiosModule: this.$axios,
        query
      })
      this.requestsCount--
      this.isDistrictSelectLoading = false
    },
    async fetchStreets(query) {
      if (query.length < 2) return false

      this.isStreetsSelectLoading = true
      this.requestsCount++

      this.refStreets = await fetchStreets({
        axiosModule: this.$axios,
        query
      })

      this.isStreetsSelectLoading = false
      this.requestsCount--
    },
    async fetchRefAddress() {
      this.requestsCount++

      if (
        !this.searchAddress.admDisctrict &&
        !this.searchAddress.district &&
        !this.searchAddress.constr &&
        !this.searchAddress.corp &&
        !this.searchAddress.house &&
        !this.searchAddress.street
      ) {
        this.searchForm.addressesId = []
        this.requestsCount--
        this.errorAddressMessage = ''
        return false
      }

      let array = await fetchRefAddress({
        axiosModule: this.$axios,
        admDistrictId: this.searchAddress.admDisctrict,
        district: this.searchAddress.district,
        construct: this.searchAddress.constr,
        corp: this.searchAddress.corp,
        house: this.searchAddress.house,
        street: this.searchAddress.street
      })

      if (
        !this.searchAddress.admDisctrict &&
        !this.searchAddress.district &&
        !this.searchAddress.constr &&
        !this.searchAddress.corp &&
        !this.searchAddress.house &&
        !this.searchAddress.street
      ) {
        array = []
      }

      this.searchForm.addressesId = array.map((item) => item.addressId)
      this.requestsCount--

      if (array.length) {
        this.errorAddressMessage = ''
      } else {
        this.errorAddressMessage =
          'Адрес не найден. Введите существующий адрес.'
      }
    },
    clearAddressesInputs(keys) {
      keys.forEach((item) => (this.searchAddress[item] = ''))
    },
    async fetchRequestTypesOptions() {
      this.refRequestTypes = await fetchRequestTypesOptions({
        axiosModule: this.$axios
      })
    },
    async fetchRequestStatusesOptions() {
      this.refRequestStatusesOptions = await fetchRequestStatusesOptions({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
<style lang="sass"></style>
