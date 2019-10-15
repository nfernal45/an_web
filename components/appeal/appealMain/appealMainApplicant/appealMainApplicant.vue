<template lang="pug">
  form-block.mb-10(title='Заявитель')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row(:gutter='20')
          el-col(:span='16')
            el-row
              el-form-item(label='Тип заявителя')
                //- span(style='margin-right: 10px') Тип заявителя
                el-radio(label='Юридическое лицо')
                el-radio(label='ИП')
            el-row  
              el-col
                el-form-item(label='Полное наименование')
                  el-input
                el-form-item(label='Сокращенное наименование юр.лица')
                  el-input
                el-form-item(label='Юридический адрес')
                  el-input

          el-col(:span='8')
            el-form-item(label='ИНН')
              el-input
            el-form-item(label='ОГРН')
              el-input
            el-form-item(label='Телефон')
              el-input
            el-form-item(label='Электронная почта')
              el-input

        el-row(:gutter='20')
          el-col  
            h4.form-title Представитель заявителя

          el-col(:span='6')
            el-form-item(label='Фамилия')
              el-input    
          el-col(:span='6')
            el-form-item(label='Имя')
              el-input  
          el-col(:span='6')
            el-form-item(label='Отчество')
              el-input  
          el-col(:span='6')
            el-form-item(label='Должность')
              el-select(:value='selectValue')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :label='item'
                          :value='item')
          
          el-col
            h4.form-title.mb-10 Полномочия представителя
            el-radio(label='Первое лицо организации')
            el-radio(label='Уполномоченный на подачу заявлений сотрудник')

</template>
<script>
export default {
  name: 'AppealMainApplicant',
  data() {
    return {
      selectValue: ''
    }
  }
}
</script>
<style lang="sass"></style>
