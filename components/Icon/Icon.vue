<template>
  <svg-icon :class="`icon-${id}`" :name="id"/>
</template>

<script>
import styles from "./Icon.scss?module";

export default {
  props: {
    id: {
      type: String,
      default: "plus"
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
