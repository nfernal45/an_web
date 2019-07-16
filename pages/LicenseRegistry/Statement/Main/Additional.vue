<template>
  <div>
    <div :class="styles.row">
      <div :class="styles.col">
        <SelectField label="Основания заключения, прекращения или расторжения договора" />
      </div>
    </div>
    <div :class="[styles.row, styles.rowCenter]">
      <div :class="styles.col">У организации происходит реорганизация</div>
      <div :class="styles.col">
        <Radio v-model="selected1" :value="value11">Да</Radio>
      </div>
      <div :class="styles.col">
        <Radio v-model="selected1" :value="value12">Нет</Radio>
      </div>
    </div>
  </div>
</template>

<script>
import SelectField from "~/components/SelectField/SelectField";
import Radio from "~/components/Radio/Radio";

import styles from "../Statement.scss?module";

export default {
  components: {
    SelectField,
    Radio
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

