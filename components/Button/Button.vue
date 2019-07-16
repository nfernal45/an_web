<template>
  <button
    @click="onClick"
    :class="[styles.button, {[styles.white]: isWhite}, {[styles.stroke]: isStroke}, {[styles.fixed]: isFixed}, className]"
    :disabled="disabled"
  >
    <Icon v-if="icon" :id="icon"/>
    <span v-if="content" v-html="content"></span>
  </button>
</template>

<script>
import Icon from "../Icon/Icon";
import styles from "./Button.scss?module";

export default {
  components: {
    Icon
  },
  props: {
    className: String,
    content: String,
    icon: String,
    isWhite: Boolean,
    isStroke: Boolean,
    isFixed: Boolean,
    disabled: Boolean,
    onClick: {
      type: Function
      // required: true
    }
  },
  data() {
    return {
      styles
    };
  }
};
</script>

<style lang="scss">
</style>

