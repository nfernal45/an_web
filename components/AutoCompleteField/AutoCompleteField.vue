<template>
  <Field :label="label" :message="message" :error="error">
    <div :class="styles.container">
      <input
        :class="['input', { 'error': isError, 'valid': isValid, 'disabled': isDisabled }]"
        type="text"
        :placeholder="placeholder"
        v-model="vModel"
        @input="(value)=>{changeHandler(this.vModel); log(value);}"
        @click="toggleOptions"
      >
      <div :class="options" v-if="showOptions">
        <div v-if="results.length">
          <div
            :class="[styles.option, {'disabled': option.disabled}, {'selected': checkSelectHandler ? checkSelectHandler(option, selectedElement): option.name === option.text}]"
            v-for="option in results"
            :key="option.code"
            @click="onSelect(option)"
          >
            <slot v-bind:option="option">{{option.name}}</slot>
          </div>
        </div>
      </div>
    </div>
  </Field>
</template>

<script>
import vClickOutside from "v-click-outside";
import Field from "../Field/Field";
import Icon from "../Icon/Icon";

import styles from "./AutoCompleteField.scss?module";

export default {
  components: {
    Field,
    Icon
  },
  mounted() {
    this.vModel = this.query;
  },
  watch: {
    query: {
      handler: function(newVal) {
        this.vModel = newVal;
      },
      deep: true
    }
  },
  props: {
    label: String,
    placeholder: {
      default: "Не выбрано"
    },
    query: String,
    results: {
      type: Array,
      default: () => {
        return [];
      }
    },
    checkSelectHandler: {
      type: Function
    },
    message: String,
    error: String,
    isError: Boolean,
    isValid: Boolean,
    isDisabled: Boolean,
    changeHandler: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      styles,
      vModel: "",
      selectedElement: {},
      showOptions: false
    };
  },
  methods: {
    log(v) {
      console.log(v);
    },
    // onChange() {
    //   this.vModel === ""
    //     ? (this.results = [])
    //     : (this.results = this.options.filter(
    //         item =>
    //           item.name.toLowerCase().indexOf(this.vModel.toLowerCase()) > -1
    //       ));
    // },
    onSelect(option) {
      this.selectedElement = option;
      this.changeHandler(option.name, option.code);
      this.hideOptions();
    },
    selectOption(option) {
      this.toggleOptions();
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    hideOptions() {
      this.showOptions = false;
    }
  }
};
</script>

<style lang="scss">
</style>
