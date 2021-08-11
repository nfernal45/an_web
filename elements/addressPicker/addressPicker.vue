<template lang="pug">
  div
    el-form-item(label='Адрес')
      el-row(:gutter='20' type='flex' justify='space-between')
        el-col(:span='18')
          el-input(:value='addressName' readonly)
        el-col.flex.justify-end(:span='6')
          el-button.width-100(
            type='primary'
            :loading='isAdmDistrictSelectLoading'
            @click='openAddressSearchModal'
          ) {{ addressId ? 'Изменить адрес' : 'Выбрать адрес'}}

    el-dialog(
      title='Поиск адреса'
      :visible.sync='idAddressSearchModalVisible'
      :close-on-click-modal='false'
      width='30%'
      destroy-on-close
      @closed='clearAddressSearchForm'
      style='overscroll-behavior: contain;'
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
            no-match-text='По Вашему запросу район не найден'
            no-data-text='По Вашему запросу район не найден'
            autocomplete
            clearable
            :loading='isDistrictSelectLoading'
          )
            el-option(v-for='district in districtsOptions'
              :key='district.districtId'
              :label='district.baseName'
              :value='district.districtId'
            )

        el-form-item(label='Улица')
          el-select.width-100(
            v-model='streetId'
            placeholder='Выберите улицу'
            filterable
            remote
            :remote-method='fetchStreetsOptions'
            no-match-text='По Вашему запросу улица не найдена'
            no-data-text='По Вашему запросу улица не найдена'
            autocomplete
            clearable
            :loading='isStreetSelectLoading'
          )
            el-option(v-for='street in streetsOptions'
              :key='street.streetId'
              :label='street.streetName'
              :value='street.streetId'
            )

        el-form-item(label='Номер дома')
          el-select.width-100(
            v-model='houseNum'
            :disabled='!streetId'
            :placeholder='streetId ? "Введите номер дома" : "Выберите улицу"'
            filterable
            remote
            :remote-method='fetchHouseNumbersOptions'
            no-match-text='По Вашему запросу номер дома не найден'
            no-data-text='По Вашему запросу номер дома не найден'
            autocomplete
            clearable
            :loading='isHouseNumSelectLoading'
          )
            el-option(v-for='houseNumber in housesNumbersOptions'
              :key='houseNumber.houseNum'
              :label='houseNumber.houseNum'
              :value='houseNumber.houseNum'
            )

        el-form-item(label='Корпус дома')
          el-select.width-100(
            v-model='corp'
            :disabled='!houseNum'
            :placeholder='houseNum ? "Введите корпус дома" : "Укажите номер дома"'
            filterable
            remote
            :remote-method='fetchCorpsNumbersOptions'
            no-match-text='По Вашему запросу корпус дома не найден'
            no-data-text='По Вашему запросу корпус дома не найден'
            autocomplete
            clearable
            :loading='isCorpNumSelectLoading'
            @clear='fetchAddressesOptions'
          )
            el-option(v-for='coprNumber in coprsNumbersOptions'
              :key='coprNumber.corp'
              :label='coprNumber.corp'
              :value='coprNumber.corp'
            )

        el-form-item(label='Номер строения')
          el-select.width-100(
            v-model='construct'
            :disabled='!houseNum'
            :placeholder='houseNum ? "Введите номер строения" : "Укажите номер дома"'
            filterable
            remote
            :remote-method='fetchConstrctsNumbersOptions'
            no-match-text='По Вашему запросу номер строения не найден'
            no-data-text='По Вашему запросу номер строения не найден'
            autocomplete
            clearable
            :loading='isConstrctNumSelectLoading'
            @clear='fetchAddressesOptions'
          )
            el-option(v-for='constrctNumber in constrctsNumbersOptions'
              :key='constrctNumber.constrct'
              :label='constrctNumber.constrct'
              :value='constrctNumber.constrct'
            )

      div.flex.align-center.justify-center(v-loading='isAddresseSelectLoding' style='min-height: 50px')
        ul(
          v-show='addressesOptions.length'
          :class='styles["addressess-list"]'
        )
          li(
            v-for='(address, index) in addressesOptions'
            :key='address.addressId'
            :class='{ [styles["selected"]]: address.selected }'
            @click='selectAddress(index, address)'
          ) {{ address.fullAddress }}

        span(
          v-show='isAddressesOptionsEmpty'
          :class='styles["message"]'
        ) По Вашему запросу адреса не найдены

      div(slot='footer' class='dialog-footer')
        el-button(@click='closeAddressSearchModal') Закрыть
        el-button(
          type='primary'
          :disabled='!selectedAddressId'
          @click='confirmSelect'
        ) Выбрать адрес
</template>
<script>
import styles from './addressPicker.module.sass?module'
import fetchAddress from '@/services/api/references/addresses/fetchAddress'
import fetchAdmDistrictsOptions from '@/services/api/references/addresses/fetchAdmDistrictsOptions'
import fetchDistrictsOptions from '@/services/api/references/addresses/fetchDistrictsOptions'
import fetchStreetsOptions from '@/services/api/references/addresses/fetchStreetsOptions'
import fetchHouseNumbersOptions from '@/services/api/references/addresses/fetchHouseNumbersOptions'
import fetchCorpsNumbersOptions from '@/services/api/references/addresses/fetchCorpsNumbersOptions'
import fetchConstrctsNumbersOptions from '@/services/api/references/addresses/fetchConstrctsNumbersOptions'

export default {
  name: 'AddressPicker',
  props: {
    value: {
      type: null,
      default: null
    },
    addressId: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      selectedAddressId: null,
      selectedBtiHouseItcId: null,
      addressName: '',
      addressesOptions: [],
      idAddressSearchModalVisible: false,
      isAddresseSelectLoding: false,
      admDistrictId: null,
      admDistrictsOptions: [],
      isAdmDistrictSelectLoading: false,
      isDistrictSelectLoading: false,
      districtId: null,
      districtsOptions: [],
      streetId: null,
      streetsOptions: [],
      isStreetSelectLoading: false,
      houseNum: null,
      housesNumbersOptions: [],
      isHouseNumSelectLoading: false,
      corp: null,
      coprsNumbersOptions: [],
      isCorpNumSelectLoading: false,
      construct: null,
      constrctsNumbersOptions: [],
      isConstrctNumSelectLoading: false
    }
  },
  computed: {
    styles() {
      return styles
    },
    isAddressesOptionsEmpty() {
      return (
        this.addressesOptions.length === 0 &&
        this.houseNum &&
        !this.isAddresseSelectLoding
      )
    }
  },
  watch: {
    addressId(value) {
      this.fetchAddreesNameById(value)
    },
    admDistrictId(value) {
      this.districtId = null
      if (value) this.fetchDistrictsOptions()
      this.clearAdressesOptions()
    },
    districtId(value) {
      this.streetId = null
      if (value) this.fetchStreetsOptions()
      this.clearAdressesOptions()
    },
    streetId(value) {
      this.houseNum = null
      this.clearHouseNums()
      this.clearAdressesOptions()
    },
    houseNum(value) {
      this.corp = null
      this.construct = null
      if (value) {
        this.fetchCorpsNumbersOptions()
        this.fetchConstrctsNumbersOptions()
        this.fetchAddressesOptions()
      }
    },
    corp(value) {
      if (value) {
        this.fetchAddressesOptions()
      }
    },
    construct(value) {
      if (value) {
        this.fetchAddressesOptions()
      }
    }
  },
  mounted() {
    this.fetchAddreesNameById()
  },
  methods: {
    async fetchAddreesNameById() {
      if (!this.addressId || this.addressName.length) return
      const addressesOptions = await fetchAddress({
        axiosModule: this.$axios,
        query: { addressId: this.addressId }
      })

      this.addressName = addressesOptions[0].fullAddress
    },

    async fetchAddressesOptions() {
      this.isAddresseSelectLoding = true
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
      this.isAddresseSelectLoding = false
    },

    async fetchAdmDistrictsOptions() {
      if (this.admDistrictsOptions.length) return
      this.admDistrictsOptions = await fetchAdmDistrictsOptions({
        axiosModule: this.$axios
      })
    },

    async fetchDistrictsOptions(districtName) {
      this.isDistrictSelectLoading = true
      this.districtsOptions = await fetchDistrictsOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          text: districtName && districtName.length > 1 ? districtName : ''
        }
      })
      this.isDistrictSelectLoading = false
    },

    async fetchStreetsOptions(streetName) {
      if (streetName && streetName.length < 3) return
      this.isStreetSelectLoading = true
      this.streetsOptions = await fetchStreetsOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          text: streetName && streetName.length > 2 ? streetName : ''
        }
      })
      this.isStreetSelectLoading = false
    },

    async fetchHouseNumbersOptions(houseNum) {
      if (!houseNum || !houseNum.length) return
      this.isHouseNumSelectLoading = true
      this.housesNumbersOptions = await fetchHouseNumbersOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          street: this.streetId ? this.streetId : '',
          text: houseNum
        }
      })
      this.isHouseNumSelectLoading = false
    },

    async fetchCorpsNumbersOptions(corp) {
      this.isCorpNumSelectLoading = true
      this.coprsNumbersOptions = await fetchCorpsNumbersOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          street: this.streetId ? this.streetId : '',
          house: this.houseNum ? this.houseNum : '',
          text: corp
        }
      })
      this.isCorpNumSelectLoading = false
    },

    async fetchConstrctsNumbersOptions(constrcts) {
      this.isConstrctNumSelectLoading = true
      this.constrctsNumbersOptions = await fetchConstrctsNumbersOptions({
        axiosModule: this.$axios,
        query: {
          adm_district: this.admDistrictId ? this.admDistrictId : '',
          district: this.districtId ? this.districtId : '',
          street: this.streetId ? this.streetId : '',
          house: this.houseNum ? this.houseNum : '',
          text: constrcts && constrcts.length > 1 ? constrcts : ''
        }
      })
      this.isConstrctNumSelectLoading = false
    },

    async openAddressSearchModal() {
      this.isAdmDistrictSelectLoading = true
      await this.fetchAdmDistrictsOptions()
      this.idAddressSearchModalVisible = true
      this.isAdmDistrictSelectLoading = false
    },

    closeAddressSearchModal() {
      this.idAddressSearchModalVisible = false
    },

    clearHouseNums() {
      this.houseNum = null
      this.housesNumbersOptions = []
    },

    clearAdressesOptions() {
      this.addressesOptions = []
    },

    clearAddressSearchForm() {
      this.admDistrictId = null
      this.districtId = null
      this.streetId = null
      this.houseNum = null
      this.districtsOptions = []
      this.streetsOptions = []
      this.housesNumbersOptions = []
      this.coprsNumbersOptions = []
      this.constrctNumbersOptions = []
      this.clearAdressesOptions()
    },

    selectAddress(index, { addressId, fiasHouseGuid, btiHouseItcId }) {
      this.addressesOptions.forEach((address) => {
        if (address.selected) this.$set(address, 'selected', false)
      })
      const option = this.addressesOptions[index]
      this.$set(option, 'selected', true)
      this.selectedAddressId = addressId
      this.selectedFiasHouseGuid = fiasHouseGuid
      this.selectedBtiHouseItcId = btiHouseItcId
    },

    confirmSelect() {
      this.addressId = this.selectedAddressId
      this.$emit('selectAddress', {
        addressId: this.selectedAddressId,
        fiasHouseGuid: this.selectedFiasHouseGuid,
        btiHouseItcId: this.selectedBtiHouseItcId
      })
      this.addressName = this.addressesOptions.find((option) => {
        return option.addressId === this.selectedAddressId
      }).fullAddress
      this.closeAddressSearchModal()
    }
  }
}
</script>
<style lang="sass"></style>
