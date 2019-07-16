<template>
  <div :class="[styles.field, {[styles.inline]: inline}]">
    <div :class="styles.label" v-if="label" v-html="label"></div>
    <div :class="styles.body">
      <div :class="styles.content">
        <slot></slot>
        <Icon v-if="icon" :id="icon"/>
      </div>
      <div :class="styles.message" v-if="message" v-html="message"></div>
      <div :class="styles.error" v-if="error" v-html="error"></div>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon/Icon";
import styles from "./Field.scss?module";

export default {
  components: {
    Icon
  },
  props: {
    label: String,
    icon: String,
    message: String,
    error: String,
    inline: {
      type: Boolean,
      default: false
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
