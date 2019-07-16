<template>
  <div :class="styles.row">
    <div :class="styles.col">
      <TextField label="Номер:" />
    </div>
    <div :class="styles.col">
      <DateField :class="styles.mb16" label="Дата:" />
    </div>
    <div :class="[styles.col, styles.col50]">
      <SelectField :class="styles.mb16" label="Руководитель:" />
      <SelectField label="Исполнитель:" />
    </div>
  </div>
</template>

<script>
import TextField from "~/components/TextField/TextField";
import SelectField from "~/components/SelectField/SelectField";
import DateField from "~/components/DateField/DateField";

import styles from "../Statement.scss?module";

export default {
  components: {
    TextField,
    SelectField,
    DateField
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

