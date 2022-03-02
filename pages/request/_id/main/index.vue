<template lang="pug">
  div.request-main
      // Основные сведения
      el-row
        request-main-general-info(:disabledEditing='disabledEditing')

      // Заявитель
      el-row
        request-main-licensee(:disabledEditing='disabledEditing')

      // Уполномоченная организация - представитель заявителя
      el-row
        request-main-licensee-representative(:disabledEditing='disabledEditing')

      // Сведения о многоквартирном доме
      el-row
        request-main-building-info(:disabledEditing='disabledEditing')

      // Сведения о разрешении на ввод объекта в эксплуатацию
      el-row
        request-main-permission-facility-info(:disabledEditing='disabledEditing')

      // Дополнительные сведения
      el-row
        request-main-extra-info(:disabledEditing='disabledEditing')
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import requestMainGeneralInfo from '@/components/request/requestMain/requestMainGeneralInfo'
import requestMainLicensee from '@/components/request/requestMain/requestMainLicensee'
import requestMainLicenseeRepresentative from '@/components/request/requestMain/requestMainLicenseeRepresentative'
import requestMainBuildingInfo from '@/components/request/requestMain/requestMainBuildingInfo'
import requestMainPermissionFacilityInfo from '@/components/request/requestMain/requestMainPermissionFacilityInfo'
import requestMainExtraInfo from '@/components/request/requestMain/requestMainExtraInfo'

const requestModuleName = 'request'

export default {
  name: 'RequestMainPage',
  components: {
    requestMainGeneralInfo,
    requestMainLicensee,
    requestMainLicenseeRepresentative,
    requestMainBuildingInfo,
    requestMainPermissionFacilityInfo,
    requestMainExtraInfo
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['can', 'canAny']),
    ...mapState(requestModuleName, {
      request: (state) => state.request,
      isRequestSaving: (state) => state.isRequestSaving
    }),
    requestId() {
      return this.$route.params.id
    },
    // false - will not disable, true - will be disable
    disabledEditing() {
      if (
        this.canAny(['RL_GF_REQUEST_CREATE', 'RL_GF_REQUEST_REGISTER']) &&
        !this.isRequestSaving
      )
        return false

      return true
    }
  },
  methods: {
    addDocument() {
      this.$notify({
        type: 'warning',
        offset: 130,
        message: 'Это функция в разработке.'
      })
    }
  }
}
</script>

<style lang="scss">
.request-main .form-title {
  color: #0e69af;
}
.request-main .el-form-item__label {
  height: 30px;
}
</style>
