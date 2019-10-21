<template lang="pug">
  el-form-item(:label='label')
    el-select.width-100(:value='selectValue')
      el-option(v-for='item in [1, 2, 3, 4]'
                :key='item'
                :label='item'
                :value='item')
</template>

<script>
export default {
  name: 'EmployeePicker',
  props: {
    label: {
      type: String,
      default: 'Сотрудник'
    }
    // value: {
    //   type: [String, null],
    //   required: true
    // }
  },
  data() {
    return {
      employeeOptions: [],
      selectValue: null
    }
  },
  mounted() {
    console.log(this.value)
  }
}
</script>

<style></style>
