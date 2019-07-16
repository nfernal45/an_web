<template>
  <div>
    <Spoiler v-for="(item, index) in items" :title="item.title" :selected="true" :key="index">
      <div :is="item.component"></div>
    </Spoiler>
  </div>
</template>

<script>
import Spoiler from "~/components/Spoiler/Spoiler";

import Applicant from "./Applicant";
import MGI from "./MGI";

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
          title: "Документы заявителя",
          component: Applicant
        },
        {
          title: "Документы МЖИ",
          component: MGI
        }
      ]
    };
  }
};
</script>

<style>
</style>

