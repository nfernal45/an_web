<template>
  <section class="container">
    <div :class="styles.info">
      <span :class="styles.infoItem" v-for="item in info" :key="item.title">
        <strong>{{item.title}}:</strong>
        {{item.value}}
      </span>
    </div>
    <Tabs :items="tabsItems">
      <div slot="sidebar">
        <div :class="styles.actions">
          <nuxt-link to="/">
            <Button :class="styles.actionsBtn" content="Назад к списку" />
          </nuxt-link>
          <Button :class="styles.actionsBtn" content="Сохранить" />
          <Button :class="[styles.actionsBtn, styles.actionsMb]" content="Печать" />
          <Button :class="styles.actionsBtn" content="Изменить статус_1" />
          <Button :class="styles.actionsBtn" content="Изменить статус_2" />
          <Button :class="styles.actionsBtn" content="Изменить статус_3" />
        </div>
      </div>
    </Tabs>
  </section>
</template>

<script>
import Tabs from "~/components/Tabs/Tabs";
import Button from "~/components/Button/Button";

import styles from "./Statement.scss?module";

export default {
  scrollToTop: true,
  components: {
    Tabs,
    Button
  },
  data() {
    return {
      styles,
      info: [
        {
          title: "Заявление  Рег. №",
          value: "МЖИ-05-ХХ-ХХХХ/YY"
        },
        {
          title: "Заявитель",
          value: "Товарищество собственников жилья «Снежная 23»"
        },
        {
          title: "Статус",
          value: ""
        }
      ],
      tabsItems: [
        {
          path: "/statement",
          name: "Заявление"
        },
        {
          path: "/statement/docs",
          name: "Документы заявления"
        },
        {
          path: "/statement/mv",
          name: "МВ запросы"
        },
        {
          path: "/statement/suspension",
          name: "Приостановление"
        },
        {
          path: "/statement/reviews",
          name: "Ход рассмотрения"
        },
        {
          path: "/statement/decisions",
          name: "Решение по заявлению"
        }
      ]
    };
  }
};
</script>

<style>
</style>

