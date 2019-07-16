<template>
  <div>
    <div :class="styles.mb16">
      <span @click="addingDoc = true">
        <Button content="Добавить документ МЖИ" />
      </span>
    </div>
    <div v-if="addingDoc">
      <SelectField
        :class="styles.mb16"
        label="Вызывается форма ЦХЭД с классификатором документов с последующим выполнением шагов по приложению документа, подписанию ЭЦП должностного лица"
      />
      <span @click="addingDoc = false; addedDoc = true">
        <Button :class="styles.minButton" isStroke content="Ок" />
      </span>
    </div>
    <div v-if="addedDoc">
      <div :class="styles.label">Распоряжение о приостановлении рассмотрения заявления</div>
      <div :class="[styles.row, styles.rowCenter]">
        <div :class="styles.col">
          <TextField />
        </div>
        <div :class="styles.col">
          <FileUpload v-model="filesLoaded" label="Загрузить" :remove="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/Button/Button";
import TextField from "~/components/TextField/TextField";
import SelectField from "~/components/SelectField/SelectField";
import FileUpload from "~/components/FileUpload/FileUpload";

import styles from "../Statement.scss?module";

export default {
  components: {
    Button,
    TextField,
    SelectField,
    FileUpload
  },
  data() {
    return {
      styles,
      addingDoc: false,
      addedDoc: false,
      filesLoaded: [{ name: "name.png" }]
    };
  }
};
</script>

<style>
</style>

