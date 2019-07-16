<template>
  <transition name="fade-out">
    <div v-show="isLoading" :class="styles.preloader" :style="{ height: height }"></div>
  </transition>
</template>

<script>
import styles from "./Preloader.scss?module";

export default {
  name: "Preloader",
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: "100%"
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
