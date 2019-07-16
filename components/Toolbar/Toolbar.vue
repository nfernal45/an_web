<template>
  <div :class="styles.toolbar">
    <Button
      :class="styles.button"
      v-for="item in actions"
      :onClick="item.onClick"
      :isWhite="item.isWhite"
      :icon="item.icon"
      :content="item.title"
      :key="item.title"
    />
    <modal v-if="visibleSearch" @close="visibleSearch = false">
      <h3 slot="header">Поиск обращений</h3>
      <div slot="body" :class="styles.body">
        <div :class="styles.row">
          <div :class="styles.col">По полю</div>
          <div :class="styles.col">
            <select-field v-model="selected1" :options="options" :selected="selected1"></select-field>
          </div>
          <div :class="styles.col">
            <select-field v-model="selected2" :options="options" :selected="selected2"></select-field>
          </div>
          <div :class="styles.col">
            <text-field value="Концерн"></text-field>
          </div>
        </div>
        <div :class="styles.row">
          <div :class="styles.col">
            <Button content="Добавить условие" icon="plus" isWhite/>
          </div>
        </div>
      </div>
      <div slot="footer" :class="styles.footer">
        <Button :class="styles.button" content="Сбросить все" isStroke/>
        <Button :class="styles.button" content="Искать"/>
      </div>
    </modal>
  </div>
</template>

<script>
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import TextField from "../TextField/TextField";
import SelectField from "../SelectField/SelectField";

import styles from "./Toolbar.scss?module";

export default {
  components: {
    Button,
    Modal,
    TextField,
    SelectField
  },
  data() {
    return {
      styles,
      visibleSearch: false,
      actions: [
        {
          icon: "settings",
          title: "Настройка таблицы",
          onClick: console.log("onClick"),
          isWhite: true
        },
        {
          icon: "export",
          title: "Экспорт в Excel",
          onClick: console.log("onClick"),
          isWhite: true
        },
        {
          icon: "print",
          title: "Печать",
          onClick: console.log("onClick"),
          isWhite: true
        },
        {
          icon: "search",
          title: "Поиск",
          onClick: this.toggleSearch
        }
      ],
      options: [
        {
          text: "Заявитель",
          value: "1"
        },
        {
          text: "Содержит",
          value: "2"
        },
        {
          text: "Хранение",
          value: "3",
          disabled: true
        },
        {
          text: "Захоранение",
          value: "4"
        },
        {
          text: "Обработка",
          value: "5"
        },
        {
          text: "Утилизация",
          value: "6"
        },
        {
          text: "Обезвреживание",
          value: "7"
        }
      ],
      selected1: "Заявитель",
      selected2: "Содержит"
    };
  },
  methods: {
    toggleSearch() {
      this.visibleSearch = !this.visibleSearch;
    }
  }
};
</script>

<style lang="scss">
</style>
