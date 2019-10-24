<template lang="pug">
  form-block.mb-10(title='Направление документов на проверку в ЖН по АО')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Округ')
              el-select(v-model='selectValue')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :label='item'
                          :value='item')
          el-col(:span='6')
            el-form-item(label='Дата направления документов')
              el-date-picker

          el-col(:span='6')
            el-form-item(label='Плановый срок исполнения')
              el-date-picker
        
        el-row.mb-10(style='font-size: 12px')
          strong Сведения о действующей лицензии по данным МЖИ: 
          span  {{ licenseData.number }}
          strong  от
          span  {{ licenseData.date }} 
          strong  Лицензионное дело 
          span  {{ licenseData.id }}

</template>
<script>
export default {
  name: 'DocCheckDirectionComponent',
  data() {
    return {
      // test data
      selectValue: '',
      licenseData: {
        number: '077 001582',
        date: '22.06.2018',
        id: 'МЖИ-07-07-717/15'
      }
    }
  }
}
</script>
<style lang="sass"></style>
