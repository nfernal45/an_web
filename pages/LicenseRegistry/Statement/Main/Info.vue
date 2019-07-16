<template>
  <div>
    <div :class="styles.row">
      <div :class="[styles.col, styles.col50]">
        <div :class="styles.mb16">
          <div :class="styles.label">Цель обращения:</div>
          <div :class="styles.mt6" v-for="goal in goalsOfRequest" :key="goal.title">
            <Radio v-model="selected1" :value="goal.value">{{goal.title}}</Radio>
          </div>
        </div>
      </div>
      <div :class="[styles.col, styles.col50]">
        <div :class="styles.row">
          <div :class="[styles.col, styles.col100]">
            <div :class="styles.label">Способ получения решения</div>
            <SelectField />
          </div>
        </div>
        <div :class="styles.row">
          <div :class="styles.col">
            <DateField label="Плановый срок оказания ГУ" />
          </div>
        </div>
      </div>
    </div>
    <div :class="styles.label">Место подачи документов</div>
    <div :class="styles.row">
      <div :class="styles.col">
        <Radio v-model="selected2" :value="value21">Служба одного окна</Radio>
      </div>
      <div :class="styles.col">
        <Radio v-model="selected2" :value="value22">Портал</Radio>
      </div>
    </div>
    <div :class="styles.row">
      <div :class="styles.col">
        <TextField label="Рег.№" />
      </div>
      <div :class="styles.col" v-if="selected2 == 0">
        <div :class="[styles.row, styles.mb0]">
          <div :class="styles.col">
            <DateField label="Дата подачи заявления *:" />
          </div>
          <div :class="styles.col">
            <SelectField label="Специалист службы одного окна" />
          </div>
        </div>
      </div>
      <div :class="styles.col" v-if="selected2 == 1">
        <div :class="[styles.row, styles.mb0]">
          <div :class="styles.col">
            <DateField label="Дата получения в МЖИ:" />
          </div>
          <div :class="styles.col">
            <TextField label="Рег.№ Портала" />
          </div>
          <div :class="styles.col">
            <DateField label="Дата подачи заявления на Портале" />
          </div>
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
      goalsOfRequest: [
        {
          title: "Включение домов в реестр",
          value: 0
        },
        {
          title: "Внесение изменений в реестр",
          value: 1
        },
        {
          title: "Исключение дома из реестра",
          value: 2
        },
        {
          title: "Временное управление на основании РД",
          value: 3
        }
      ],
      selected1: 0,
      selected2: 0,
      value21: 0,
      value22: 1,
    };
  }
};
</script>

<style>
</style>

