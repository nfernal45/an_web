<template lang="pug">
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
</template>
<script>
export default {
  name: 'AppealMainApplicantRepresentative'
}
</script>
<style lang="sass"></style>
