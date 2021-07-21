<template lang="pug">
  el-form-item(:label='label')
    el-select.width-100(
      v-model='employeeId'
      clearable
      filterable
      @focus="onFocus"
      :remote-method="fetchEmployeeOptionsByName"
      placeholder="Введите фамилию сотрудника"
      no-match-text="По Вашему запросу сотрудник не найден"
      no-data-text="По Вашему запросу сотрудник не найден"
      :loading="isLoading"
      autocomplete
    )
      el-option(v-for='orgStructure in employeeOptions'
        :key='orgStructure.orgStrctId'
        :label='`${orgStructure.refPersonByPersonId.personName} - ${orgStructure.refDeptByDeptId.deptNameSht} - ${orgStructure.refAppointmentrtByAppointmentrtId.appntmtNameShrt}`'
        :value='orgStructure.orgStrctId'
      )
</template>

<script>
import fetchEmployeeOptions from '@/services/api/references/fetchEmployeeOptions'
export default {
  name: 'EmployeePicker',
  props: {
    label: {
      type: String,
      default: 'Сотрудник'
    },
    value: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      employeeOptions: [],
      isLoading: false
    }
  },
  computed: {
    employeeId: {
      get() {
        return this.employeeOptions.length ? this.value : null
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    value(value) {
      if (!value || this.employeeOptions.length) return
      this.fetchEmployeeById()
    }
  },
  mounted() {
    if (this.value) this.fetchEmployeeById()
  },
  methods: {
    async onFocus() {
      await this.fetchEmployeeOptionsByName('')
    },
    async fetchEmployeeOptionsByName(personName) {
      this.isLoading = true
      if (!personName) {
        this.employeeOptions = await fetchEmployeeOptions({
          axiosModule: this.$axios,
          query: {
            'refPersonByPersonId.personName!': `null`,
            'refPersonByPersonId.rsysUserByRsysUserId.rsysFRoleUserByRsysUserId.rsysFRoleByFRoleId.FRoleId': 305
          }
        })
      } else {
        this.employeeOptions = await fetchEmployeeOptions({
          axiosModule: this.$axios,
          query: {
            'refPersonByPersonId.personName': `${personName}*`,
            'refPersonByPersonId.rsysUserByRsysUserId.rsysFRoleUserByRsysUserId.rsysFRoleByFRoleId.FRoleId': 305
          }
        })
      }
      this.isLoading = false
    },
    async fetchEmployeeById() {
      if (!this.value) return
      this.employeeOptions = await fetchEmployeeOptions({
        axiosModule: this.$axios,
        query: { orgStrctId: this.value }
      })
    }
  }
}
</script>

<style></style>
