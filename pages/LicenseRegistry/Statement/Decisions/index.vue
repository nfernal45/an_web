<template>
  <div>
    <Spoiler v-for="(item, index) in items" :title="item.title" :selected="true" :key="index">
      <div :is="item.component"></div>
    </Spoiler>
  </div>
</template>

<script>
import Spoiler from "~/components/Spoiler/Spoiler";

import Decision from "./Decision";
import Notification from "./Notification";

import styles from "../Statement.scss?module";

export default {
  components: {
    Spoiler
  },
  data() {
    return {
      styles,
      items: [
        {
          title: "Решение по заявлению",
          component: Decision
        },
        {
          title: "Уведомление",
          component: Notification
        }
      ]
    };
  }
};
</script>

<style>
</style>

