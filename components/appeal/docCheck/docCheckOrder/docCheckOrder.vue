<template lang="pug">
  form-block.mb-10(title='Распоряжение на проведение проверки')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Номер')
              el-input
          el-col(:span='6')
            el-form-item(label='Дата:')
              el-date-picker
          el-col(:span='10')
            el-form-item(label='Руководитель:')
              el-select(v-model='selectValue' 
                        style='width: 350px')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :label='item'
                          :value='item')
          el-col(:span='10' :offset='12')
            el-form-item(label='Исполнитель:')
              el-select(v-model='selectValue' 
                        style='width: 350px')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :label='item'
                          :value='item')

</template>
<script>
export default {
  name: 'DocCheckOrder',
  data() {
    return {
      selectValue: ''
    }
  }
}
</script>
<style lang="sass"></style>
