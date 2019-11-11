<template lang="pug">
  div
    el-form-item(label='Адрес')
      el-row(:gutter='20' type='flex' justify='space-between')
        el-col(:span='18')
          el-input(:value='addressName' readonly)
        el-col.flex.justify-end(:span='6')
          el-button.width-100(type='primary' @click='openAddressSearchModal') {{ addressId ? 'Изменить адрес' : 'Выбрать адрес'}}

    el-dialog(
      title='Поиск адреса'
      :visible.sync='idAddressSearchModalVisible'
      width='30%'
      destroy-on-close
    )
      el-form(label-position='top' size='small')
        el-form-item(label='Округ')
          el-select.width-100(
            v-model='admDistrictId'
            placeholder='Выберите округ'
            clearable
          )
            el-option(v-for='admDistrict in admDistrictsOptions'
              :key='admDistrict.admDistrictId'
              :label='admDistrict.shortNameAdmDistr'
              :value='admDistrict.admDistrictId'
            )

        el-form-item(label='Район')
          el-select.width-100(
            v-model='districtId'
            placeholder='Выберите район'
            filterable
            remote
            :remote-method='fetchDistrictsOptions'
            no-match-text="По Вашему запросу район не найден"
            no-data-text="По Вашему запросу район не найден"
            autocomplete
            clearable
            @clear='fetchDistrictsOptions'
          )
            el-option(v-for='district in districtsOptions'
              :key='district.districtId'
              :label='district.shortNameDistr'
              :value='district.districtId'
            )

        el-form-item(label='Улица')
          el-select.width-100(
            v-model='streetId'
            placeholder='Выберите улицу'
            filterable
            remote
            :remote-method='fetchStreetsOptions'
            no-match-text="По Вашему запросу улица не найдена"
            no-data-text="По Вашему запросу улица не найдена"
            autocomplete
            clearable
            @clear='fetchStreetsOptions'
          )
            el-option(v-for='street in streetsOptions'
              :key='street.streetId'
              :label='street.streetName'
              :value='street.streetId'
            )
        el-row(:gutter='20')
          el-col(:span='8')
            el-form-item(label='Номер дома')
              el-select.width-100(
                v-model='houseNum'
                :disabled='!streetId'
                :placeholder='streetId ? "Выберите номер дома" : "Выберите улицу"'
                filterable
                remote
                :remote-method='fetchHouseNumbersOptions'
                no-match-text="По Вашему запросу номер дома не найден"
                no-data-text="По Вашему запросу номер дома не найден"
                autocomplete
                clearable
                @clear='fetchHouseNumbersOptions'
              )
                el-option(v-for='houseNumber in housesNumbersOptions'
                  :key='houseNumber.houseNum'
                  :label='houseNumber.houseNum'
                  :value='houseNumber.houseNum'
                )
          el-col(:span='8')
            el-form-item(label='Номер корпуса')
              el-select.width-100(
                v-model='corp'
                :disabled='!houseNum'
                :placeholder='houseNum ? "Выберите номер корпуса" : "Выберите номер дома"'
                filterable
                remote
                :remote-method='fetchCorpNumbersOptions'
                no-match-text="По Вашему запросу корпус не найден"
                no-data-text="По Вашему запросу корпус не найден"
                autocomplete
                clearable
                @clear='fetchCorpNumbersOptions'
              )
                el-option(v-for='coprNumber in coprsNumbersOptions'
                  :key='coprNumber.corp'
                  :label='coprNumber.corp'
                  :value='coprNumber.corp'
                )
          el-col(:span='8')
            el-form-item(label='Номер строения')
              el-select.width-100(
                v-model='constrct'
                :disabled='!houseNum'
                :placeholder='houseNum ? "Выберите номер строения" : "Выберите номер дома"'
                filterable
                remote
                :remote-method='fetchConstrctsNumbersOptions'
                no-match-text="По Вашему запросу номер строения не найден"
                no-data-text="По Вашему запросу номер строения не найден"
                autocomplete
                clearable
                @clear='fetchConstrctsNumbersOptions'
              )
                el-option(v-for='constrctsNumber in constrctNumbersOptions'
                  :key='constrctsNumber.constrct'
                  :label='constrctsNumber.constrct'
                  :value='constrctsNumber.constrct'
                )

        ul(
          v-show='addressesOptions.length'
          :class='styles["addressess-list"]'
        )
          li(v-for='address in addressesOptions') {{ address.fullAddress }}

      div(slot='footer' class='dialog-footer')
        el-button(@click='closeAddressSearchModal') Закрыть
        el-button(type='primary') Выбрать адрес
</template>
<script>
import styles from './addressPicker.module.sass?module'
import fetchAddress from '@/services/api/references/addresses/fetchAddress'
import fetchAdmDistrictsOptions from '@/services/api/references/addresses/fetchAdmDistrictsOptions'
import fetchDistrictsOptions from '@/services/api/references/addresses/fetchDistrictsOptions'
import fetchStreetsOptions from '@/services/api/references/addresses/fetchStreetsOptions'
import fetchHouseNumbersOptions from '@/services/api/references/addresses/fetchHouseNumbersOptions'
import fetchCorpNumbersOptions from '@/services/api/references/addresses/fetchCorpNumbersOptions'
import fetchConstrctsNumbersOptions from '@/services/api/references/addresses/fetchConstrctsNumbersOptions'
export default {
  name: 'AddressPicker',
  props: {
    value: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      addressName: null,
      addressesOptions: [],
      idAddressSearchModalVisible: false,
      admDistrictId: null,
      admDistrictsOptions: [],
      districtId: null,
      districtsOptions: [],
      streetId: null,
      streetsOptions: [],
      houseNum: null,
      housesNumbersOptions: [],
      corp: null,
      coprsNumbersOptions: [],
      constrct: null,
      constrctNumbersOptions: []
    }
  },
  computed: {
    styles() {
      return styles
    },
    addressId: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    addressId(value) {
      this.fetchAddreesNameById(value)
    },
    admDistrictId() {
      this.districtId = null
      this.fetchDistrictsOptions()
      this.fetchAddressesOptions()
    },
    districtId() {
      this.streetId = null
      this.fetchStreetsOptions()
    },
    streetId() {
      this.houseNum = null
      this.fetchHouseNumbersOptions()
    },
    houseNum() {
      this.corp = null
      this.fetchCorpNumbersOptions()
    }
  },
  mounted() {
    this.fetchAddreesNameById()
  },
  methods: {
    async fetchAddreesNameById() {
      if (!this.addressId) return
      const addressesOptions = await fetchAddress({
        axiosModule: this.$axios,
        query: { addressId: this.addressId }
      })

      this.addressName = addressesOptions[0].fullAddress
    },

    async fetchAddressesOptions() {
      this.addressesOptions = await fetchAddress({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          street: this.streetId ? this.streetId : '',
          house: this.houseNum ? this.houseNum : '',
          corp: this.corp ? this.corp : '',
          construct: this.construct ? this.construct : ''
        }
      })
    },

    async fetchAdmDistrictsOptions() {
      if (this.admDistrictsOptions.length) return
      this.admDistrictsOptions = await fetchAdmDistrictsOptions({
        axiosModule: this.$axios
      })
    },

    async fetchDistrictsOptions(districtName) {
      this.districtsOptions = await fetchDistrictsOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          text: districtName && districtName.length > 1 ? districtName : ''
        }
      })
    },

    async fetchStreetsOptions(streetName) {
      this.streetsOptions = await fetchStreetsOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          text: streetName && streetName.length > 1 ? streetName : ''
        }
      })
    },

    async fetchHouseNumbersOptions(streetName) {
      this.housesNumbersOptions = await fetchHouseNumbersOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          street: this.streetId ? this.streetId : '',
          text: streetName && streetName.length > 1 ? streetName : ''
        }
      })
    },

    async fetchCorpNumbersOptions(streetName) {
      this.coprsNumbersOptions = await fetchCorpNumbersOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          street: this.streetId ? this.streetId : '',
          house: this.houseNum ? this.houseNum : '',
          text: streetName && streetName.length > 1 ? streetName : ''
        }
      })
    },

    async fetchConstrctsNumbersOptions(streetName) {
      this.constrctsNumbersOptions = await fetchConstrctsNumbersOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          street: this.streetId ? this.streetId : '',
          house: this.houseNum ? this.houseNum : '',
          text: streetName && streetName.length > 1 ? streetName : ''
        }
      })
    },

    openAddressSearchModal() {
      this.fetchAdmDistrictsOptions()
      this.idAddressSearchModalVisible = true
    },

    closeAddressSearchModal() {
      this.idAddressSearchModalVisible = false
      this.clearAddressSearchForm()
    },

    clearAddressSearchForm() {
      this.admDistrictId = null
      this.districtId = null
      this.streetId = null
      this.houseNum = null
    }
  }
}
</script>
<style lang="sass"></style>
