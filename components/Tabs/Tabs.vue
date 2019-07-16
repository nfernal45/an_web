<template>
  <div :class="styles.tabs">
    <div :class="styles.head">
      <h1 :class="styles.title" v-if="title" v-text="title"></h1>
      <div :class="styles.nav">
        <router-link
          :class="styles.button"
          :exact-active-class="styles.active"
          v-for="item in items"
          :to="item.path"
          :key="item.path"
        >{{item.name}}</router-link>
      </div>
      <slot name="toolbar" />
    </div>
    <div :class="styles.container">
      <div :class="styles.flex">
        <div :class="styles.sidebar">
          <slot name="sidebar"></slot>
        </div>
        <div :class="styles.content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styles from "./Tabs.scss?module";

export default {
  components: {},
  props: {
    title: String,
    items: Array
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
