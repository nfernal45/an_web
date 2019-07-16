<template>
  <div>
    <div :class="[styles.row, styles.rowMain]">
      <div :class="[styles.col, styles.col75]">
        <TextField :class="mb16" label="Адрес" />
      </div>
      <div :class="[styles.col, styles.col25]">
        <TextField :class="mb16" label="Индекс" />
      </div>
    </div>
    <div :class="[styles.row, styles.rowMain, styles.rowBottom]">
      <div :class="[styles.col, styles.col75]">
        <div :class="[styles.row, styles.rowCenter, styles.mb0]">
          <div :class="styles.col">Тип номера</div>
          <div :class="styles.col">
            <Radio v-model="selected1" :value="value11">Кадастровый</Radio>
          </div>
          <div :class="styles.col">
            <Radio v-model="selected1" :value="value12">Условный</Radio>
          </div>
          <div :class="styles.col">
            <TextField :class="mb16" />
          </div>
        </div>
      </div>
      <div :class="[styles.col, styles.col25]">
        <TextField :class="mb16" label="Код ФИАС" />
      </div>
    </div>
  </div>
</template>

<script>
import Radio from "~/components/Radio/Radio";
import TextField from "~/components/TextField/TextField";

import styles from "../Statement.scss?module";

export default {
  components: {
    Radio,
    TextField
  },
  data() {
    return {
      styles,
      selected1: 0,
      value11: 0,
      value12: 1
    };
  }
};
</script>

<style>
</style>

