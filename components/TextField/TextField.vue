<template>
  <Field :inline="inline" :label="label" :message="message" :error="error" :icon="icon">
    <input
      :class="['input', { 'error': isError, 'valid': isValid, 'disabled': isDisabled }]"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      v-model="input_value"
      :min="min"
      :max="max"
      ref="input"
    >
  </Field>
</template>

<script>
import Field from "../Field/Field";
import Icon from "../Icon/Icon";

import styles from "./TextField.scss?module";

export default {
  components: {
    Field,
    Icon
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    button: {
      type: String,
      default: ""
    },
    placeholder: String,
    value: String | Number,
    inline: Boolean,
    label: String,
    message: String,
    icon: String,
    isError: Boolean,
    error: String,
    isValid: Boolean,
    isDisabled: Boolean,
    changeHandler: Function,
    min: Number,
    max: Number
  },
  data() {
    return {
      styles
    };
  },
  computed: {
    input_value: {
      get() {
        return this.value;
      },
      set(value) {
        if (this.changeHandler) {
          this.changeHandler(value);
        }
      }
    }
  }
};
</script>

<style lang="scss">
</style>
