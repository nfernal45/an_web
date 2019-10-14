<template lang="pug">
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
</template>
<script>
export default {
  name: 'AppealMainBuildingInfo'
}
</script>
<style lang="sass"></style>
