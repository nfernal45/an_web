<template>
  <Field :inline="inline" :label="label" :message="message" :error="error">
    <textarea
      v-model="textModel"
      :class="['input', 'input-area', { 'error': isError, 'valid': isValid, 'disabled': isDisabled }]"
      :placeholder="placeholder"
      v-text="model"
      @input="()=>{changeHandler(this.textModel)}"
    ></textarea>
  </Field>
</template>

<script>
import Field from "../Field/Field";

import styles from "./TextareaField.scss?module";

export default {
  components: {
    Field
  },
  props: {
    changeHandler: Function,
    label: String,
    placeholder: {
      type: String,
      default: "Не выбрано"
    },
    model: String,
    inline: Boolean,
    message: String,
    error: String,
    isError: Boolean,
    isValid: Boolean,
    isDisabled: Boolean,
    width: String
  },
  mounted() {
    this.textModel = this.model;
  },
  data() {
    return {
      styles,
      textModel: ""
    };
  }
};
</script>

<style lang="scss">
</style>
