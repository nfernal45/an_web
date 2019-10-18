<template lang="pug">
  div.appeal-main
      // Основные сведения
      el-row
        appeal-main-general-info

      // Заявитель
      el-row
        appeal-main-applicant

      // Уполномоченная организация - представитель заявителя
      el-row
        appeal-main-applicant-representative
      
      // Сведения о многоквартирном доме
      el-row
        appeal-main-building-info

      // Дополнительные сведения
      el-row
        appeal-main-extra-info
</template>

<script>
import appealMainGeneralInfo from '@/components/appeal/appealMain/appealMainGeneralInfo'
import appealMainApplicant from '@/components/appeal/appealMain/appealMainApplicant'
import appealMainApplicantRepresentative from '@/components/appeal/appealMain/appealMainApplicantRepresentative'
import appealMainBuildingInfo from '@/components/appeal/appealMain/appealMainBuildingInfo'
import appealMainExtraInfo from '@/components/appeal/appealMain/appealMainExtraInfo'

export default {
  name: 'AppealMainPage',
  components: {
    appealMainGeneralInfo,
    appealMainApplicant,
    appealMainApplicantRepresentative,
    appealMainBuildingInfo,
    appealMainExtraInfo
  },
  data() {
    return {}
  },
  computed: {
    appealId() {
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
.appeal-main .form-title {
  color: #0e69af;
}
.appeal-main .el-form-item__label {
  height: 30px;
}
</style>
