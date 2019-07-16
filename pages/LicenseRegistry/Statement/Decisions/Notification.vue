<template>
  <div :class="styles.mb16">
    <div :class="styles.row">
      <div :class="styles.col">
        <Radio v-model="selected1" :value="value11">О внесении изменений</Radio>
      </div>
      <div :class="styles.col">
        <Radio v-model="selected1" :value="value12">Отказ</Radio>
      </div>
    </div>
    <div v-if="selected1 == 0">
      <p>Включить в реестр лицензий сведения о том, что организация осуществляет деятельность по управлению МКД.</p>
      <p>Исключить из реестра лицензий сведения о том, что организация осуществляет деятельность по управлению МКД.</p>
    </div>
    <div v-if="selected1 == 1">
      <div :class="styles.label">Основания в отказе</div>
      <div :class="styles.line" v-for="reason in reasons" :key="reason">
        <Checkbox>{{reason}}</Checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import Radio from "~/components/Radio/Radio";
import Checkbox from "~/components/Checkbox/Checkbox";

import styles from "../Statement.scss?module";

export default {
  components: {
    Radio,
    Checkbox
  },
  data() {
    return {
      styles,
      selected1: 0,
      value11: 0,
      value12: 1,
      reasons: [
        "Заявление не соответствует требованиям нормативно-правовых документов (Приказ № 938 от 25.12.2015 года)",
        "Наличие в представленных документах противоречивых либо недостоверных сведений",
        "Противоречие сведений, представленных заявителем, содержащимся в реестре на момент рассмотрения заявления сведениям",
        "Не выполнение заявителем требований, установленных ч.2 ст.198 ЖК РФ",
        "Вступившее в законную силу решение суда о признании заявителя банкротом",
        "Признаки ничтожности решения общего собрания собственников помещений"
      ]
    };
  }
};
</script>

<style>
</style>

