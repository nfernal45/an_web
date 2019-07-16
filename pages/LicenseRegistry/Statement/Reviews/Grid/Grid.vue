<template>
  <div :class="styles.table">
    <div :class="[styles.row, styles.head]">
      <div :class="styles.cell" v-for="(item, index) in headings" :key="index">
        <div :class="styles.title" v-text="item"></div>
      </div>
    </div>
    <div :class="styles.row">
      <div :class="styles.cell">Не указан адрес многоквартирного дома (п.п. «а» п. 2 Порядка).</div>
      <div
        :class="styles.cell"
      >Сверка сведений, указанных в заявлении. Адрес дома проверяется через «Реестр домовладений» на портале «Дома Москвы», ФИАС на портале ГИС ЖКХ (при расхождении сведений приоритет у портала «Дома Москвы»)</div>
      <div :class="styles.cell">
        <Radio style="margin-bottom: 8px">Да</Radio>
        <Radio>Нет</Radio>
      </div>
      <div :class="styles.cell"></div>
    </div>
    <div :class="styles.row">
      <div
        :class="styles.cell"
      >В заявлении не указаны основания заключения, прекращения или расторжения договора управления МКД (п.п. «б» п. 2 Порядка)</div>
      <div
        :class="styles.cell"
      >Сверка сведений указанных в заявлении с приложенным решением о заключении, прекращении или расторжении договора управления многоквартирным домом</div>
      <div :class="styles.cell"></div>
      <div :class="styles.cell"></div>
    </div>
    <div :class="styles.row">
      <div
        :class="styles.cell"
      >В заявлении не указаны реквизиты договора управления многоквартирным домом (п.п. «в» п. 2 Порядка)</div>
      <div
        :class="styles.cell"
      >Сверка сведений указанных в заявлении с приложенным договором управления. В случае расторжения договора управления, либо заключение договора управления по результатам открытого конкурса (договор управления может не прилагаться), сведения о договоре управления можно получить на портале ГИС ЖКХ</div>
      <div :class="styles.cell"></div>
      <div :class="styles.cell"></div>
    </div>
  </div>
</template>

<script>
import Radio from "~/components/Radio/Radio";

import styles from "./Grid.scss?module";

export default {
  components: {
    Radio
  },
  data() {
    return {
      styles,
      headings: ["Нарушение", "Метод проверки", "Результат проверки", "Решение"]
    };
  }
};
</script>

<style>
</style>

