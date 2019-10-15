<template lang="pug">
  form-block.mb-10(title='Заключение по итогам проверки заявления и документов')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row.mb-10(:gutter='20')
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
        
        el-row.mb-10
          el-col
            h4.form-title Соответствие заявления и документов положениям пунктов 2 и 3 настоящего Порядка
</template>
<script>
export default {
  name: 'DocCheckConclusion'
}
</script>
<style lang="sass" scoped>
.form-title
    color: #0e69af
</style>
