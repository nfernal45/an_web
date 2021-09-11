<template lang="pug">
  el-form-item(:label='label')
    el-select.width-100(
      v-model='employeeId'
      clearable
      filterable
      remote
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
    },
    queryParams: {
      type: Object,
      default: () => {}
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
    async fetchEmployeeOptionsByName(personName) {
      if (personName.length < 2) return
      this.isLoading = true
      this.employeeOptions = await fetchEmployeeOptions({
        axiosModule: this.$axios,
        query: {
          'refPersonByPersonId.personName': `${personName}*`,
          ...this.queryParams
        }
      })
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
