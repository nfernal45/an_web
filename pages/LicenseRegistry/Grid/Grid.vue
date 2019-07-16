<template>
  <div :class="styles.table">
    <div :class="[styles.row, styles.head]">
      <div :class="styles.cell" v-for="(item, index) in headings" :key="index">
        <div :class="styles.title" v-text="item"></div>
      </div>
    </div>
    <nuxt-link to="statement" tag="div" :class="[styles.row]" v-for="(item, index) in data" :key="index">
      <div :class="styles.cell" v-for="(cell, index) in item" :key="index">
        <div :class="styles.text">{{cell}}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import styles from "./Grid.scss?module";

export default {
  props: {
    headings: Array,
    data: Array
  },
  components: {},
  data() {
    return {
      styles
    };
  }
};
</script>

<style>
</style>

