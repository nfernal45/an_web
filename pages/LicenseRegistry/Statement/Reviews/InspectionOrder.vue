<template>
  <div :class="styles.mb32">
    <div :class="styles.label">{{title}}</div>
    <div :class="styles.row">
      <div :class="styles.col">
        <TextField label="Номер:"/>
      </div>
      <div :class="styles.col">
        <DateField label="Дата:"/>
      </div>
      <div :class="[styles.col, styles.col50]">
        <SelectField :class="styles.mb16" label="Руководитель:"/>
        <SelectField label="Исполнитель:"/>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "~/components/TextField/TextField";
import DateField from "~/components/DateField/DateField";
import SelectField from "~/components/SelectField/SelectField";

import styles from "../Statement.scss?module";

export default {
  components: {
    TextField,
    DateField,
    SelectField
  },
  props: {
    title: String
  },
  data() {
    return {
      styles
    };
  }
};
</script>

<style>
</style>

