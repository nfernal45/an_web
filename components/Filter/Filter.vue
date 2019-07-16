<template>
  <div :class="styles.filter">
    <div :class="styles.head">
      <Icon id="filter"/>
      <h3 :class="styles.title" v-text="title"></h3>
    </div>
    <div :class="styles.center">
      <div :class="styles.row">
        <div :class="styles.cell">
          <text-field value="0004/19" label="Номер обращения"></text-field>
        </div>
        <div :class="styles.cell">
          <text-field label="Номер заявления"></text-field>
        </div>
        <div :class="styles.cell">
          <text-field label="Маршрут"></text-field>
        </div>
        <div :class="styles.cell">
          <select-field v-model="selected" :options="options" :selected="selected" label="Статус"></select-field>
        </div>
        <div :class="styles.cell">
          <date-field v-model="date1" label="Дата подачи с:"></date-field>
        </div>
        <div :class="styles.cell">
          <date-field v-model="date2" label="по:"></date-field>
        </div>
        <div :class="styles.cell">
          <text-field label="Заявитель"></text-field>
        </div>
        <div :class="styles.cell">
          <text-field label="Исполнитель"></text-field>
        </div>
      </div>
    </div>
    <div :class="styles.actions">
      <Button :class="styles.button" content="Очистить все" isStroke />
      <Button :class="styles.button" content="Применить" />
    </div>
  </div>
</template>

<script>
import Icon from "../Icon/Icon";
import TextField from "../TextField/TextField";
import SelectField from "../SelectField/SelectField";
import DateField from "../DateField/DateField";
import Button from "../Button/Button";

import styles from "./Filter.scss?module";

export default {
  components: {
    Icon,
    TextField,
    SelectField,
    DateField,
    Button
  },
  props: {
    items: Array
  },
  data() {
    return {
      title: "Фильтр",
      styles,
      selected: "6",
      options: [
        {
          text: "Образование",
          value: "1"
        },
        {
          text: "Накопление",
          value: "2",
          disabled: true
        },
        {
          text: "Хранение",
          value: "3",
          disabled: true
        },
        {
          text: "Захоранение",
          value: "4"
        },
        {
          text: "Обработка",
          value: "5"
        },
        {
          text: "Утилизация",
          value: "6"
        },
        {
          text: "Обезвреживание",
          value: "7"
        }
      ],
      date1: "20.05.2019 19:45",
      date2: "20.05.2019 19:45"
    };
  }
};
</script>

<style lang="scss">
</style>
