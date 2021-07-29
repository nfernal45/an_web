<template lang="pug">
  el-form-item(:label='label')
    el-select.width-100(
      v-model='employeeId'
      clearable
      filterable
      @focus="onFocus"
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
      fullEmployeeOptions: [],
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
    if (this.value) {
      this.fetchEmployeeById()
    } else {
      this.onFocus()
    }
  },
  methods: {
    async onFocus() {
      if (this.fullEmployeeOptions.length === 0) {
        this.fullEmployeeOptions = await this.fetchEmployeeOptionsByName()
      }
    },
    async fetchEmployeeOptionsByName() {
      this.isLoading = true
      this.employeeOptions = await fetchEmployeeOptions({
        axiosModule: this.$axios,
        query: {
          'refPersonByPersonId.personName!': null,
          'refPersonByPersonId.rsysUserByRsysUserId.rsysFRoleUserByRsysUserId.rsysFRoleByFRoleId.FRoleId': 305
        }
      })
      this.isLoading = false
      return this.employeeOptions
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
