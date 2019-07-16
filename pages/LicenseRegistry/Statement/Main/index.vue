<template>
  <div>
    <Spoiler v-for="(item, index) in items" :title="item.title" :selected="true" :key="index">
      <div :is="item.component"></div>
    </Spoiler>
  </div>
</template>

<script>
import Spoiler from "~/components/Spoiler/Spoiler";

import Info from "./Info";
import Applicant from "./Applicant";
import Organization from "./Organization";
import Building from "./Building";
import Additional from "./Additional";

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
          title: "Основные сведения",
          component: Info
        },
        {
          title: "Заявитель",
          component: Applicant
        },
        {
          title: "Уполномоченная организация - представитель заявителя",
          component: Organization
        },
        {
          title: "Сведения о многоквартирном доме",
          component: Building
        },
        {
          title: "Дополнительные сведения",
          component: Additional
        }
      ]
    };
  }
};
</script>

<style>
</style>

