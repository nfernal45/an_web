<template lang="pug">
  div.appeal-main
    //- h1  Основная вкладка заявления {{ appealId }}
    el-row
      form-block.mb-10(title='Основные сведения')
        template(slot='content')
          el-form(size='small' label-position='top')
            el-row.mb-20
              el-col(:span='10')
                h4.form-title.mb-10 Цель обращения
                div(v-for='item in [1, 2, 3, 4]')
                  el-radio(:label='item')

              el-col(:span='14')
                el-row.mb-10
                  h4.form-title.mb-10 Способ получения решения
                  el-select(size='small' placeholder='Select something')
                el-row
                  //- span(style='display: block; margin-bottom: 5px') 
                  el-form-item(label='Плановый срок оказания ГУ')
                    el-date-picker
            
            el-row.mb-20  
              el-col
                h4.form-title.mb-10 Место подачи документов
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
                  el-select
        
    el-row
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
                  el-select
              
              el-col
                h4.form-title.mb-10 Полномочия представителя
                el-radio(label='Первое лицо организации')
                el-radio(label='Уполномоченный на подачу заявлений сотрудник')

    el-row
      form-block.mb-10(title='Уполномоченная организация - представитель заявителя')
        template(slot='content')
          el-form(label-position='top' size='small')
            el-row(:gutter='20')
              el-col(:span='16')
                el-row
                  el-form-item(label='Тип представителя')
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
    
    el-row
      form-block.mb-10(title='Сведения о многоквартирном доме')
        template(slot='content')
          el-form(label-position='top' size='small')
            el-row(:gutter='20')
              el-col(:span='16')
                el-form-item(label='Адрес')
                  el-input
                el-col(:span='12')
                  el-form-item(label='Тип номера')
                    el-radio(label='Кадастровый')
                    el-radio(label='Условный')
                el-col(:span='12' style='padding-right: 0 !important')
                  el-form-item(label=' ')
                    el-input
              el-col(:span='8')
                el-form-item(label='Индекс')
                  el-input
                el-form-item(label='Код ФИАС')
                 el-input

    el-row
      form-block.mb-10(title='Дополнительные сведения')
        template(slot='content')
          el-form(label-position='top' size='small')
            el-form-item(label='Основания заключения, прекращения или расторжения договора')
              el-select
            el-form-item(label='У организации происходит реорганизация')
              el-radio(label='Да')
              el-radio(label='Нет')


</template>

<script>
export default {
  name: 'AppealMainPage',
  data() {
    return {}
  },
  computed: {
    appealId() {
      return this.$route.params.id
    }
  },
  methods: {
    addDocument() {
      this.$notify({
        type: 'warning',
        offset: 130,
        message: 'Это функция в разработке.'
      })
    }
  }
  // asyncData(context) {
  //   return context.$axios
  //     .$get('https://jsonplaceholder.typicode.com/posts/')
  //     .then((data) => ({ content: data }))
  // }
}
</script>

<style lang="scss">
.appeal-main .form-title {
  color: #0e69af;
}
.appeal-main .el-form-item__label {
  height: 30px;
}
</style>
