<template>
  <div :class="styles.form">
    <div :class="[styles.row, styles.rowMain]">
      <div :class="styles.col">
        <div :class="styles.row">
          <div :class="styles.col">
            <TextField label="Рег № заявления:" />
          </div>
          <div :class="styles.col">
            <DateField label="Дата подачи заявления с:" />
          </div>
          <div :class="styles.col">
            <DateField label="по:" />
          </div>
        </div>
        <div :class="styles.row">
          <div :class="styles.col">Место подачи:</div>
          <div :class="styles.col">
            <Checkbox>Одно окно</Checkbox>
          </div>
          <div :class="styles.col">
            <Checkbox>Портал</Checkbox>
          </div>
        </div>
        <div :class="styles.row">
          <div :class="styles.col">
            <TextField label="Рег № Портала:" />
          </div>
          <div :class="styles.col">
            <TextField label="ЕНО:" />
          </div>
        </div>
        <div :class="styles.row">
          <div :class="[styles.col, styles.label]">Заявитель:</div>
          <div :class="styles.col">
            <Checkbox>Юр. лицо</Checkbox>
          </div>
          <div :class="styles.col">
            <Checkbox>ИП</Checkbox>
          </div>
        </div>
        <div :class="styles.row">
          <div :class="[styles.col, styles.colWide]">
            <TextField label="Полное наименование заявителя:" />
          </div>
        </div>
      </div>
      <div :class="styles.col">
        <div :class="styles.row">
          <div :class="styles.col">
            <div :class="styles.label">Цель обращения:</div>
            <div :class="styles.checkbox" v-for="goal in goalsOfRequest" :key="goal.title">
              <Checkbox>{{goal.title}}</Checkbox>
            </div>
          </div>
          <div :class="styles.col">
            <div :class="styles.label">Статус заявления:</div>
            <div
              :class="[styles.checkbox, {[styles.checkboxRed] : status.isRed}]"
              v-for="status in applicationStatuses"
              :key="status.title"
            >
              <Checkbox>{{status.title}}</Checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="styles.row">
      <div :class="[styles.col, styles.col20]">
        <SelectField label="Округ:" />
      </div>
      <div :class="[styles.col, styles.col20]">
        <SelectField label="Улица:" />
      </div>
      <div :class="styles.col">
        <TextField label="Дом:" />
      </div>
      <div :class="styles.col">
        <TextField label="Корпус:" />
      </div>
      <div :class="styles.col">
        <TextField label="Строение:" />
      </div>
      <div :class="styles.col">
        <TextField label="Подъезд / Часть дома:" />
      </div>
    </div>
    <div :class="styles.row">
      <div :class="[styles.col, styles.label]">Распоряжение:</div>
      <div :class="styles.col">
        <Checkbox>Внести в реестр</Checkbox>
      </div>
      <div :class="styles.col">
        <Checkbox>Отказ</Checkbox>
      </div>
    </div>
    <div :class="styles.row">
      <div :class="styles.col">
        <TextField label="№ распоряжения:" />
      </div>
      <div :class="styles.col">
        <DateField label="Дата с:" />
      </div>
      <div :class="styles.col">
        <DateField label="по:" />
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "~/components/TextField/TextField";
import DateField from "~/components/DateField/DateField";
import Checkbox from "~/components/Checkbox/Checkbox";
import SelectField from "~/components/SelectField/SelectField";
import styles from "./SearchForm.scss?module";

export default {
  components: {
    TextField,
    DateField,
    Checkbox,
    SelectField
  },
  data() {
    return {
      styles,
      goalsOfRequest: [
        {
          title: "Включение домов в реестр"
        },
        {
          title: "Внесение изменений в реестр"
        },
        {
          title: "Исключение дома из реестра"
        }
      ],
      applicationStatuses: [
        {
          title: "На регистрации"
        },
        {
          title: "На рассмотрении"
        },
        {
          title: "Решение принято"
        },
        {
          title: "Отказано",
          isRed: true
        },
        {
          title: "Запрошены документы"
        },
        {
          title: "Приостановлено"
        },
        {
          title: "Еще.."
        }
      ]
    };
  }
};
</script>

<style>
</style>

