<template lang="pug">
  div.request-main
      // Основные сведения
      el-row
        request-main-general-info

      // Заявитель
      el-row
        request-main-applicant

      // Уполномоченная организация - представитель заявителя
      el-row
        request-main-applicant-representative
      
      // Сведения о многоквартирном доме
      el-row
        request-main-building-info

      // Дополнительные сведения
      el-row
        request-main-extra-info
</template>

<script>
import requestMainGeneralInfo from '@/components/request/requestMain/requestMainGeneralInfo'
import requestMainApplicant from '@/components/request/requestMain/requestMainApplicant'
import requestMainApplicantRepresentative from '@/components/request/requestMain/requestMainApplicantRepresentative'
import requestMainBuildingInfo from '@/components/request/requestMain/requestMainBuildingInfo'
import requestMainExtraInfo from '@/components/request/requestMain/requestMainExtraInfo'

export default {
  name: 'RequestMainPage',
  components: {
    requestMainGeneralInfo,
    requestMainApplicant,
    requestMainApplicantRepresentative,
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
