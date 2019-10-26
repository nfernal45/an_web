<template lang="pug">
  div.request-main
      // Основные сведения
      el-row
        request-main-general-info

      // Заявитель
      el-row
        request-main-licensee

      // Уполномоченная организация - представитель заявителя
      el-row
        request-main-licensee-representative
      
      // Сведения о многоквартирном доме
      el-row
        request-main-building-info

      // Дополнительные сведения
      el-row
        request-main-extra-info
</template>

<script>
import requestMainGeneralInfo from '@/components/request/requestMain/requestMainGeneralInfo'
import requestMainLicensee from '@/components/request/requestMain/requestMainLicensee'
import requestMainLicenseeRepresentative from '@/components/request/requestMain/requestMainLicenseeRepresentative'
import requestMainBuildingInfo from '@/components/request/requestMain/requestMainBuildingInfo'
import requestMainExtraInfo from '@/components/request/requestMain/requestMainExtraInfo'

export default {
  name: 'RequestMainPage',
  components: {
    requestMainGeneralInfo,
    requestMainLicensee,
    requestMainLicenseeRepresentative,
    requestMainBuildingInfo,
    requestMainExtraInfo
  },
  data() {
    return {}
  },
  computed: {
    requestId() {
      return this.$route.params.id
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
