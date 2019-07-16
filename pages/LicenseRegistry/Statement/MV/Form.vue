<template>
  <div :class="styles.mb32">
    <div :class="styles.label">{{title}}</div>
    <div :class="[styles.row, styles.rowBottom]">
      <div :class="styles.col">
        <DateField label="Дата запроса:"/>
      </div>
      <div :class="styles.col">
        <DateField label="Дата ответа:"/>
      </div>
    </div>
    <TextField :class="styles.mb16" label="Примечание"/>
    <Button content="Запросить документ в БР"/>
  </div>
</template>

<script>
import Button from "~/components/Button/Button";
import TextField from "~/components/TextField/TextField";
import DateField from "~/components/DateField/DateField";
import FileUpload from "~/components/FileUpload/FileUpload";

import styles from "../Statement.scss?module";

export default {
  components: {
    Button,
    TextField,
    DateField,
    FileUpload
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

