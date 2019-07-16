<template>
  <div :class="styles.mb32">
    <div :class="styles.label">{{title}}</div>
    <div :class="[styles.row, styles.rowBottom]">
      <div :class="styles.col">
        <SelectField label="Округ:" />
      </div>
      <div :class="styles.col">
        <DateField label="Дата направления док-тов:" />
      </div>
      <div :class="styles.col">
        <DateField label="Плановый срок исполнения" />
      </div>
    </div>
    <p>
      <strong>Сведения о действующей лицензии по данным МЖИ: №</strong> 077 001582
      <strong>от</strong> 22.06.2018
      <strong>&nbsp;&nbsp; Лицензионное дело</strong> МЖИ-07-07-717/15
    </p>
  </div>
</template>

<script>
import DateField from "~/components/DateField/DateField";
import SelectField from "~/components/SelectField/SelectField";

import styles from "../Statement.scss?module";

export default {
  components: {
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

