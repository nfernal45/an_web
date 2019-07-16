<template>
  <div>
    <div :class="styles.row">
      <div :class="[styles.col, styles.col75]">
        <div :class="[styles.row, styles.rowCenter]">
          <div :class="styles.col">Тип заявителя</div>
          <div :class="styles.col">
            <Radio v-model="selected1" :value="value11">Юридическое лицо</Radio>
          </div>
          <div :class="styles.col">
            <Radio v-model="selected1" :value="value12">ИП</Radio>
          </div>
        </div>
      </div>
      <div :class="[styles.col, styles.col25]">
        <TextField label="ИНН *:" />
      </div>
    </div>
    <div :class="styles.row">
      <div :class="[styles.col, styles.col75]">
        <div v-if="selected1 == 0">
          <TextField :class="styles.mb16" label="Полное наименование *" />
          <TextField :class="styles.mb16" label="Сокращенное наименование юр.лица" />
          <TextField :class="styles.mb16" label="Юридический адрес" />
        </div>
        <div v-if="selected1 == 1">
          <TextField :class="styles.mb16" label="Наименование*" />
          <div :class="[styles.row, styles.mb0]">
            <div :class="[styles.col, styles.col100]">
              <TextField :class="styles.mb16" label="Фамилия:" />
            </div>
            <div :class="[styles.col, styles.col100]">
              <TextField :class="styles.mb16" label="Имя:" />
            </div>
            <div :class="[styles.col, styles.col100]">
              <TextField :class="styles.mb16" label="Отчество:" />
            </div>
          </div>
          <TextField :class="styles.mb16" label="Адрес:" />
        </div>
      </div>
      <div :class="[styles.col, styles.col25]">
        <div v-if="selected1 == 0">
          <TextField :class="styles.mb16" label="ОГРН *" />
        </div>
        <div v-if="selected1 == 1">
          <TextField :class="styles.mb16" label="ОГРНИП *" />
        </div>
        <TextField :class="styles.mb16" label="Телефон:" />
        <TextField :class="styles.mb16" label="Электронная почта:" />
      </div>
    </div>
    <div v-if="selected1 == 0">
      <div :class="styles.label">Представитель заявителя</div>
      <div :class="[styles.row, styles.mb0]">
        <div :class="[styles.col, styles.col100]">
          <TextField :class="styles.mb16" label="Фамилия:" />
        </div>
        <div :class="[styles.col, styles.col100]">
          <TextField :class="styles.mb16" label="Имя:" />
        </div>
        <div :class="[styles.col, styles.col100]">
          <TextField :class="styles.mb16" label="Отчество:" />
        </div>
        <div :class="[styles.col, styles.col100]">
          <SelectField :class="styles.mb16" label="Должность:" />
        </div>
      </div>
      <div :class="[styles.row, styles.mb0]">
        <div :class="styles.col">Полномочия представителя</div>
        <div :class="styles.col">
          <Radio :class="styles.mb6" v-model="selected2" :value="value21">первое лицо организации</Radio>
          <Radio v-model="selected2" :value="value22">уполномоченный на подачу заявлений сотрудник</Radio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Radio from "~/components/Radio/Radio";
import TextField from "~/components/TextField/TextField";
import SelectField from "~/components/SelectField/SelectField";
import DateField from "~/components/DateField/DateField";

import styles from "../Statement.scss?module";

export default {
  components: {
    Radio,
    TextField,
    SelectField,
    DateField
  },
  data() {
    return {
      styles,
      selected1: 0,
      value11: 0,
      value12: 1,
      selected2: 0,
      value21: 0,
      value22: 1
    };
  }
};
</script>

<style>
</style>

