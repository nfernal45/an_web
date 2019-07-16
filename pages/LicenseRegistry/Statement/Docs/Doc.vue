<template>
  <div>
    <div :class="styles.label" v-text="title"></div>
    <div :class="[styles.row, styles.rowBottom]">
      <div :class="styles.col">
        <TextField label="Номер:" />
      </div>
      <div :class="styles.col">
        <DateField label="Дата:" />
      </div>
      <div :class="styles.col">
        <TextField label="Кол-во страниц:" />
      </div>
      <div :class="[styles.col, styles.mb6]">
        <FileUpload v-model="filesLoaded" label="Загрузить" :remove="false" />
      </div>
      <div :class="styles.col" v-if="actions">
        <Button icon="plus" />
        <Button icon="remove" />
      </div>
    </div>
    <div :class="styles.note" v-if="text" v-text="text"></div>
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
    title: String,
    text: String,
    actions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styles,
      filesLoaded: [{ name: "name.png" }]
    };
  }
};
</script>

<style>
</style>

