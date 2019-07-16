<template>
  <div>
    <Spoiler :title="title" :selected="true">
      <div :class="styles.row">
        <div :class="styles.col">
          <TextField label="Номер:" />
        </div>
        <div :class="styles.col">
          <DateField :class="styles.mb16" label="Дата приостановления:" />
          <DateField label="Приостановлено до:" />
        </div>
        <div :class="[styles.col, styles.col50]">
          <SelectField :class="styles.mb16" label="Руководитель:" />
          <SelectField label="Исполнитель:" />
        </div>
      </div>
      <div :class="styles.mb16">
        <div :class="styles.label">Основание для приостановления</div>
        <div :class="styles.line" v-for="reason in reasons" :key="reason">
          <Checkbox>{{reason}}</Checkbox>
        </div>
      </div>
      <div :class="styles.mb16">
        <TextareaField label="Причина приостановления:" />
      </div>
      <div :class="styles.row">
        <div :class="[styles.col, styles.col50, styles.mt30]">
          <Checkbox>Получены документы, приложенные заявителем в Личном кабинете</Checkbox>
        </div>
        <div :class="styles.col">
          <DateField label="Дата получения:" />
        </div>
      </div>
      <div :class="styles.row">
        <div :class="[styles.col, styles.col50, styles.mt30]">
          <Checkbox>Нарушения устранены в полном объеме</Checkbox>
        </div>
        <div :class="styles.col">
          <DateField label="Дата возобновления:" />
        </div>
      </div>
    </Spoiler>
  </div>
</template>

<script>
import Spoiler from "~/components/Spoiler/Spoiler";
import Button from "~/components/Button/Button";
import TextField from "~/components/TextField/TextField";
import SelectField from "~/components/SelectField/SelectField";
import DateField from "~/components/DateField/DateField";
import TextareaField from "~/components/TextareaField/TextareaField";
import Checkbox from "~/components/Checkbox/Checkbox";

import styles from "../Statement.scss?module";

export default {
  components: {
    Spoiler,
    Button,
    TextField,
    SelectField,
    DateField,
    TextareaField,
    Checkbox
  },
  data() {
    return {
      styles,
      title: "Приостановление рассмотрения заявления",
      reasons: [
        "недостоверность сведений, содержащихся в заявлении и документах",
        "наличие противоречий сведений содержащимся в реестре на момент рассмотрения заявления",
        "поступление заявления от другого лицензиата, содержащего сведения в отношении того же многоквартирного дома",
        "поступление заявления о внесении изменений в реестр в связи с заключением договора управления многоквартирным домом или изменением способа управления многоквартирным домом при отсутствии заявления о прекращении, расторжении договора управления данным многоквартирным домом от иного заявителя"
      ]
    };
  }
};
</script>

<style>
</style>

