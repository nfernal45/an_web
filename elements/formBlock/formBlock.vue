<template lang="pug">
  div.form-container
    div.item-title(@click='contentIsVisible = !contentIsVisible')
      h4 {{ title }}
      font-awesome-icon.arrow-icon(:icon='currentIconPosition')

    div.item-content(v-show='contentIsVisible')
      slot(name='content')

</template>

<script>
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
.form-container {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.08);
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  .arrow-icon {
    margin-left: 10px;
  }
}
.form-container .item-title {
  background-color: rgb(224, 242, 255);
  display: flex;
  font-size: 16px;
  font-weight: 700;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: pointer;
  transition: 0.3s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: rgb(208, 235, 255);
  }
  &:active {
    background-color: rgb(151, 210, 253);
  }
}
.form-container .item-content {
  padding: 10px 13px;
  background-color: #fff;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
