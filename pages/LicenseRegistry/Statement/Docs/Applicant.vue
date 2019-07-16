<template>
  <div>
    <div :class="styles.mb16">
      <span @click="addingDoc = true">
        <Button content="Добавить документ" />
      </span>
    </div>
    <Doc
      v-for="doc in docs"
      :key="doc.title"
      :title="doc.title"
      :text="doc.text"
      :actions="doc.actions"
    />
    <div v-if="addingDoc">
      <div :class="styles.line" v-for="(option, index) in options" :key="index">
        <Checkbox>{{option}}</Checkbox>
      </div>
      <div :class="styles.mt16">
        <span @click="addingDoc = false; docs.push(newDoc)">
          <Button content="Добавить документ" />
        </span>
        <span :class="styles.ml8" @click="addingDoc = false">
          <Button content="Отмена" isStroke />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/Button/Button";
import SelectField from "~/components/SelectField/SelectField";
import Checkbox from "~/components/Checkbox/Checkbox";
import Doc from "./Doc";

import styles from "../Statement.scss?module";

export default {
  components: {
    Button,
    SelectField,
    Checkbox,
    Doc
  },
  data() {
    return {
      styles,
      docs: [
        {
          title: "Договор управления многоквартирным домом",
          text: "Основания заключения, прекращения или расторжения договора"
        },
        {
          title:
            "Лист записи Единого государственного реестра юридических лиц о реорганизации в форме преобразования"
        },
        {
          title:
            "Передаточный акт между реорганизованными юридическими лицами и юридическим лицом, создаваемым в результате слияния"
        }
      ],
      addingDoc: false,
      newDoc: {
        title: "Наименование документа_2",
        actions: true
      },
      options: [
        "Документ, подтверждающий полномочия представителя заявителя",
        "Учредительные документы",
        "Опись прилагаемых документов",
        "Протокол и решение общего собрания собственников помещений в многоквартирном доме",
        "Договор управления, условия которого утверждены решением общего собрания собственников",
        "Протокол конкурса по отбору управляющей организации для управления многоквартирным домом",
        "Договор управления многоквартирным домом, подписанного управляющей организацией, определённой победителем открытого конкурса по отбору управляющей организации",
        "Акт приема-передачи технической документации и иных связанных с управлением таким домом документов",
        "Заявление одной из сторон договора управления многоквартирным домом в случае прекращения договора управления многоквартирным домом в связи с окончанием срока его действия",
        "Лист записи Единого государственного реестра юридических лиц о реорганизации в форме присоединения к лицензиату присоединяемых лиц",
        "Прочие наименования документов из справочника"
      ]
    };
  }
};
</script>

<style>
</style>

