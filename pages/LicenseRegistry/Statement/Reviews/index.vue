<template>
  <div>
    <Spoiler v-for="(item, index) in items" :title="item.title" :selected="true" :key="index">
      <div :is="item.component"></div>
    </Spoiler>
  </div>
</template>

<script>
import Spoiler from "~/components/Spoiler/Spoiler";

import SubmissionDocs from "./SubmissionDocs";
import InspectionOrder from "./InspectionOrder";
import Conclusion from "./Conclusion";

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
          title: "Направление документов на проверку в ЖН по АО",
          component: SubmissionDocs
        },
        {
          title: "Распоряжение на проведение проверки",
          component: InspectionOrder
        },
        {
          title: "Заключение по итогам проверки заявления и документов",
          component: Conclusion
        }
      ]
    };
  }
};
</script>

<style>
</style>

