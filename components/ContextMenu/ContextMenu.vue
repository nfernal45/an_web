<template>
  <div :class="styles.menu" @mouseleave="close">
    <button :class="styles.button" @click.stop="isOpen = !isOpen" v-click-outside="close">
      <icon id="more"></icon>
    </button>
    <div :class="styles.options" v-if="isOpen" @click="isOpen = false">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Icon from "../Icon/Icon";

import styles from "./ContextMenu.scss?module";

export default {
  components: {
    Icon
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styles,
      isOpen: this.open
    };
  },
  methods: {
    close() {
      this.isOpen = false;
    }
  }
};
</script>

<style lang="scss">
</style>

