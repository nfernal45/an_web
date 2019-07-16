<template>
  <section class="container">
    <div :class="styles.start">
      <h4>Список заявлений на внесение изменений в реестр лицензий субъекта</h4>
      <div :class="styles.startBtns">
        <Button :class="styles.startBtn" content="Поиск" />
        <Button :class="styles.startBtn" content="Очистить" />
      </div>
    </div>
    <SearchForm />
    <Grid :headings="gridheadings" :data="gridData" />
  </section>
</template>

<script>
import Button from "~/components/Button/Button";

import SearchForm from "./SearchForm/SearchForm";
import Grid from "./Grid/Grid";

import styles from "./LicenseRegistry.scss?module";

export default {
  scrollToTop: true,
  components: {
    Button,
    SearchForm,
    Grid
  },
  data() {
    return {
      styles,
      gridheadings: [
        "Дата подачи заявления",
        "Рег.№",
        "Заявитель",
        "Адрес МКД",
        "Цель обращения",
        "Статус заявления"
      ],
      gridData: [
        [
          "06.02.2015",
          "МЖИ-05-ХХХХ/YY",
          'Закрытое акционерное общество ремонтно-строительная фирма "Ремстройсервис"',
          "129041, г. москва, перулок Орлово-Давыдовский, д.\xa02/5, корп.\xa03",
          "Включение",
          "Отказано"
        ],
        [
          "06.02.2015",
          "МЖИ-05-ХХХХ/YY",
          'Государственное бюджетное учреждение города Москвы "Жилищник района Ломоносовский"',
          "119313, г. Москва, проспект Ленинский, д.\xa088, стр.1",
          "Изменения",
          "Приостановлено"
        ],
        [
          "24.03.2015",
          "МЖИ-05-ХХХХ/YY",
          'Закрытое акционерное общество ремонтно-строительная фирма "Ремстройсервис"',
          "129041, г. москва, перулок Орлово-Давыдовский, д.\xa02/5, корп.\xa03",
          "Исключение",
          "Запрошены документы"
        ]
      ]
    };
  }
};
</script>

<style>
</style>

