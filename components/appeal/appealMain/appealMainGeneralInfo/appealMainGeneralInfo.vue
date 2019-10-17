<template lang="pug">
  form-block.mb-10(title='Основные сведения')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row.mb-20
          el-col(:span='10')
            h4.form-title.mb-10 Цель обращения
            //- el-form-item(label='Цель обращения')
            el-col(v-for="item in ['Прост', 'По приколу', 'Ради хайпа', 'dada']"
                  :key='item')
              el-radio(:label='item')

            //- div(v-for='item in [1, 2, 3, 4]')
              el-radio(:label='item')

          el-col(:span='14')
            el-row.mb-10
              h4.form-title.mb-10 Способ получения решения
              //- el-form-item(label='Способ получения решения')
              el-select(:value='selectValue' size='small' placeholder='Select something')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :label='item'
                          :value='item')
            el-row
              //- span(style='display: block; margin-bottom: 5px') 
              el-form-item(label='Плановый срок оказания ГУ')
                el-date-picker
        
        el-row.mb-20  
          el-col
            h4.form-title.mb-10 Место подачи документов
            //- el-form-item(label='Место подачи документов')
            el-radio(label='Служба одного окна')
            el-radio(label='Портал')
        
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Рег.№')
              el-input
          el-col(:span='6')
            el-form-item(label='Дата подачи заявления')
              el-date-picker
          el-col(:span='8')
            el-form-item(label='Специалист службы одного окна')
              el-select(:value='selectValue')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :label='item'
                          :value='item')
</template>
<script>
export default {
  name: 'AppealMainGeneralInfo',
  data() {
    return {
      selectValue: ''
    }
  }
}
</script>
<style lang="sass"></style>
