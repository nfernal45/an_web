<template lang="pug">
  form-block.mb-10(title='Дополнительные сведения')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-form-item(label='Основания заключения, прекращения или расторжения договора')
          el-select(:value='selectValue')
            el-option(v-for='item in [1, 2, 3, 4]'
                      :key='item'
                      :label='item'
                      :value='item')

        el-form-item(label='У организации происходит реорганизация')
          el-radio(label='Да')
          el-radio(label='Нет')
</template>
<script>
export default {
  name: 'RequestMainExtraInfo',
  data() {
    return {
      selectValue: ''
    }
  }
}
</script>
<style lang="sass"></style>
