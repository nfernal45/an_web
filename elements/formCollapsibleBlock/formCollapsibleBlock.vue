<template lang="pug">
  div.collapsible-container
    div.item-title(@click='contentIsVisible = !contentIsVisible') {{ title }}
      font-awesome-icon.arrow-icon(:icon='currentIconPosition')
    transition(name='fade')
      div.item-content(v-show='contentIsVisible')
        slot(name='content')

</template>

<script>
export default {
  name: 'FormCollapsibleBlock',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      contentIsVisible: false
    }
  },
  computed: {
    currentIconPosition() {
      return this.contentIsVisible ? 'chevron-up' : 'chevron-down'
    }
  }
}
</script>

<style lang="scss">
.collapsible-container {
  // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.08);
  border: 1px solid rgb(224, 242, 255);
  border-radius: 3px;

  .arrow-icon {
    margin-left: 10px;
  }
}
.collapsible-container .item-title {
  background-color: rgb(224, 242, 255);
  padding: 10px 13px;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s;

  &:active {
    background-color: rgb(151, 210, 253);
  }
}
.collapsible-container .item-content {
  padding: 10px 13px;
}
</style>
