<template>
  <div :class="styles.table">
    <div :class="[styles.row, styles.head]">
      <div :class="styles.cell" v-for="(item, index) in headings" :key="index">
        <div :class="styles.title" v-text="item.title"></div>
        <div :class="styles.note" v-if="item.note" v-text="item.note"></div>
      </div>
    </div>
    <div :class="[styles.row, {[styles.active]: activeRow}]" @click="activeRow = !activeRow">
      <div :class="styles.cell" v-for="(item, index) in data" :key="index">
        <div :class="styles.text" v-text="item.text"></div>
        <div :class="styles.note" v-if="item.note" v-text="item.note"></div>
        <div :class="styles.menu" v-if="(data.length - 1) == index && activeRow">
          <context-menu>
            <template v-slot>
              <a href="#!" @click.prevent="click">Редактировать</a>
              <a href="#!" @click.prevent="click">Удалить</a>
            </template>
          </context-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContextMenu from "../ContextMenu/ContextMenu";

import styles from "./Table.scss?module";

export default {
  components: {
    ContextMenu
  },
  props: {
    headings: Array,
    data: Array
  },
  data() {
    return {
      styles,
      activeRow: false
    };
  }
};
</script>

<style lang="scss">
</style>
