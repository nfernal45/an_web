<template>
  <div :class="styles.spoiler">
    <div
      :class="[styles.header, { [styles.active]: active }]"
      @click.prevent="active = !active"
    >{{title}}</div>
    <div :class="styles.body" v-if="active">
      <div :class="styles.content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import styles from "./Spoiler.scss?module";

export default {
  props: {
    title: String,
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styles,
      active: this.selected
    };
  }
};
</script>

<style lang="scss">
</style>
