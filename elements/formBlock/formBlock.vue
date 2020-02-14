<template lang="pug">
  div(:class='styles["form-container"]')
    div(
      :class='styles["item-title"]'
      @click='contentIsVisible = !contentIsVisible')
      h3 {{ title }}
      div(style='margin-right:auto; margin-left:10px;')
        slot(name='tooltip')
      font-awesome-icon.arrow-icon(:icon='currentIconPosition')

    transition(name='fade' appear)
      div(:class='styles["item-content"]'
          v-if='contentIsVisible')
        slot(name='content')

</template>

<script>
import styles from './formBlock.module.sass?module'

export default {
  name: 'FormBlock',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      contentIsVisible: true
    }
  },
  computed: {
    styles: () => styles,
    currentIconPosition() {
      return this.contentIsVisible ? 'chevron-up' : 'chevron-down'
    }
  }
}
</script>
