<template>
  <div>
    <Spoiler :title="title" :selected="true">
      <div style="max-width: 640px">
        <Form v-for="item in items" :key="item.title" :title="item.title" />
        <div :class="styles.mb16">
          <div :class="styles.mb16">
            <span @click="addingDoc = !addingDoc">
              <Button content="Добавить документы для запроса" />
            </span>
          </div>
          <div v-if="addingDoc">
            <SelectField :class="styles.mb16" label="Наименование документа" />
            <Form />
          </div>
        </div>
      </div>
    </Spoiler>
  </div>
</template>

<script>
import Spoiler from "~/components/Spoiler/Spoiler";
import Button from "~/components/Button/Button";
import SelectField from "~/components/SelectField/SelectField";

import Form from "./Form";

import styles from "../Statement.scss?module";

export default {
  components: {
    Spoiler,
    Button,
    SelectField,
    Form
  },
  data() {
    return {
      styles,
      title:
        "Запрос документов в Базовом регистре для проверки предоставленных сведений",
      items: [
        {
          title: "ФНС: Выписка из ЕГРЮЛ/ЕГРИП"
        },
        {
          title: "Росреестр: Выписка из ЕГРН"
        },
        {
          title:
            "Мосгосстройнадзор: Выписка о получении разрешения на ввод в эксплуатацию"
        }
      ],
      addingDoc: false
    };
  }
};
</script>

<style>
</style>

