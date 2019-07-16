<template>
  <div :class="styles.mb32">
    <div :class="styles.label">{{title}}</div>
    <div :class="[styles.row, styles.mb32]">
      <div :class="styles.col">
        <TextField label="Номер:" />
      </div>
      <div :class="styles.col">
        <DateField label="Дата заключения:" />
      </div>
      <div :class="[styles.col, styles.col50]">
        <SelectField :class="styles.mb16" label="Руководитель:" />
        <SelectField label="Исполнитель:" />
      </div>
    </div>
    <div :class="styles.mb32">
      <div :class="[styles.row, styles.rowCenter]">
        <div :class="styles.col">
          <div
            :class="[styles.label, styles.mb0]"
          >Соответствие заявления и документов положениям пунктов 2 и 3 настоящего Порядка</div>
        </div>
        <div :class="[styles.col, styles.mlAuto]">
          <SelectField />
        </div>
      </div>
      <Grid />
    </div>
    <div :class="styles.mb32">
      <div :class="[styles.row, styles.rowCenter]">
        <div :class="styles.col">
          <div
            :class="[styles.label, styles.mb0]"
          >Достоверность сведений, содержащихся в заявлении и документах, указанных в пункте 3 настоящего Порядка</div>
        </div>
        <div :class="[styles.col, styles.mlAuto]">
          <SelectField />
        </div>
      </div>
      <Grid />
    </div>
    <div :class="styles.mb32">
      <div :class="[styles.row, styles.rowCenter]">
        <div :class="styles.col">
          <div
            :class="[styles.label, styles.mb0]"
          >Отсутствие противоречий сведений, представленных заявителем, содержащимся в реестре на момент рассмотрения заявления сведениям</div>
        </div>
        <div :class="[styles.col, styles.mlAuto]">
          <SelectField />
        </div>
      </div>
      <Grid />
    </div>
    <div :class="styles.mb32">
      <div :class="[styles.row, styles.rowCenter]">
        <div :class="styles.col">
          <div
            :class="[styles.label, styles.mb0]"
          >Следующая граппа проверок (всего 6 по текущему состоянию справочника)</div>
        </div>
        <div :class="[styles.col, styles.mlAuto]">
          <SelectField />
        </div>
      </div>
      <Grid />
    </div>
    <div>
      <div :class="[styles.label, styles.labelRed]">Итоги заключения</div>
      <div :class="styles.line" v-for="summary in summaries" :key="summary">
        <Radio>{{summary}}</Radio>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "~/components/TextField/TextField";
import DateField from "~/components/DateField/DateField";
import SelectField from "~/components/SelectField/SelectField";
import Radio from "~/components/Radio/Radio";

import Grid from "./Grid/Grid";

import styles from "../Statement.scss?module";

export default {
  components: {
    TextField,
    DateField,
    SelectField,
    Radio,
    Grid
  },
  props: {
    title: String
  },
  data() {
    return {
      styles,
      summaries: [
        "внести изменения в сведения о многоквартирных домах и включить в перечень многоквартирных домов, находящихся в управлении",
        "внести изменения в сведения о многоквартирных домах и исключить из перечня многоквартирных домов, находящихся в управлении",
        "принять решение об отказе во внесении изменений в реестр и возврате заявления, по основаниям подпункта «а» пункта 9 Порядка (несоответствие заявления и документов)",
        "принять решение об отказе во внесении изменений в реестр и возврате заявления, по основаниям подпункта «б» пункта 9 Порядка (недостоверность сведений)"
      ]
    };
  }
};
</script>

<style>
</style>

