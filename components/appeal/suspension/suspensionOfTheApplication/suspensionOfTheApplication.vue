<template lang="pug">
  form-block(title='Приостановление решения заявления')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Номер')
              el-input
          el-col(:span='6')
            el-form-item(label='Дата приостановления')
              el-date-picker
          el-col(:span='12')
            el-form-item(label='Руководитель')
              el-select(v-model='selectValue' style='width: 350px')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :value='item'
                          :label='item')

        el-row(:gutter='20')
          el-col(:span='6' :offset='6')
            el-form-item(label='Приостановлено до:')
              el-date-picker
          el-col(:span='6')
            el-form-item(label='Исполнитель')
              el-select(v-model='selectValue' style='width: 350px')
                el-option(v-for='item in [1, 2, 3, 4]'
                          :key='item'
                          :value='item'
                          :label='item')

        el-row(:gutter='20')
          el-col
            //- h4.form-title Основания для приостановления 
            el-form-item(label='Основания для приостановления')
              el-checkbox-group.flex.flex-column.justify-start.align-start(v-model='checkboxGroupValues')
                  el-checkbox(v-for="item in lorem"
                              :key='item'
                              :label='item'
                              :name='item'
                              border
                              style='margin: 5px')

        el-row(:gutter='20')
          el-col
            el-form-item(label='Причина приостановления')
              el-input(type='textarea'
                      :minlength='10'
                      :maxlength='500')
        
        el-row(:gutter='20')
          el-col(:span='16')
            el-checkbox(label='Получены документы, приложенные заявителем в Личном кабинете')
            el-checkbox(label='Нарушения устранены в полном объёме')
          el-col(:span='8')
            el-form-item(label='Дата получения:')
              el-date-picker
            el-form-item(label='Дата возобновления:')
              el-date-picker


</template>
<script>
export default {
  name: 'SuspensionOfTheApplication',
  data() {
    return {
      selectValue: '',
      checkboxGroupValues: [],
      lorem: [
        'Lorem Ipsum - это текст-"рыба", часто используемый в печати',
        'Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
        'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.'
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
.form-title
  color: #0e69af
</style>
