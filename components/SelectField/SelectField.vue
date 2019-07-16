<template>
  <Field :inline="inline" :label="label" :message="message" :error="error">
    <div :class="styles.container" v-click-outside="hideOptions">
      <!-- <div :class="styles.text">{{ selected }}</div> -->
      <input
        :class="['input', styles.input, { 'error': isError, 'valid': isValid, 'disabled': isDisabled }]"
        type="text"
        :placeholder="placeholder"
        :disabled="isDisabled"
        v-model="content"
        @click="toggleOptions"
        readonly
        ref="input"
      >
      <div :class="[styles.options, {[styles.show]: showOptions}]">
        <div
          :class="[styles.option, {[styles.disabled]: option.disabled}, {[styles.active]: content === option.text}]"
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
        >{{ option.text }}</div>
      </div>
    </div>
  </Field>
</template>

<script>
import Vue from "vue";
import vClickOutside from "v-click-outside";

import Field from "../Field/Field";
import styles from "./SelectField.scss?module";

Vue.use(vClickOutside);

export default {
  components: {
    Field
  },
  props: {
    placeholder: {
      type: String,
      default: "Не выбрано"
    },
    selected: {
      type: [String, Number],
      default: null
    },
    options: Array,
    inline: Boolean,
    label: String,
    message: String,
    error: String,
    isError: Boolean,
    isValid: Boolean,
    isDisabled: Boolean,
    changeHandler: Function
  },
  data() {
    return {
      styles,
      showOptions: false
    };
  },
  methods: {
    selectOption(option) {
      console.log("selectOption", option.value);
      this.content = option.value;
      this.toggleOptions();
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    hideOptions() {
      this.showOptions = false;
    }
  },
  computed: {
    content: {
      get() {
        return this.selected;
      },
      set(value) {
        console.log("PERIOD IN SET" + value);
        this.changeHandler(value);
      }
    }
    // selectText() {
    //   if (this.content === null) return;
    //   let t = this;
    //   return this.options.find(function(el) {
    //     return el.value === t.content;
    //   });
    // }
  }
};
</script>

<style lang="scss">
</style>
