<template>
  <div :class="styles.radio">
    <label :class="styles.label">
      <input
        :class="styles.input"
        type="radio"
        :name="name"
        :value="value"
        :disabled="disabled"
        :required="required"
        :checked="radioState"
        @change="toggle"
      >
      <div :class="styles.content">
        <slot></slot>
      </div>
    </label>
    <div :class="styles.error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import styles from "./Radio.scss?module";

export default {
  model: {
    prop: "model",
    event: "input"
  },
  props: {
    model: {
      type: String | Array,
      default: undefined
    },
    checked: Boolean,
    value: String,
    name: String,
    required: Boolean,
    disabled: Boolean,
    isError: Boolean,
    error: String
  },
  data() {
    return {
      styles
    };
  },
  computed: {
    radioState() {
      if (this.model === undefined) return this.checked;
      return this.model === this.value;
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      this.$emit("input", this.state ? "" : this.value);
    }
  }
};
</script>

<style lang="scss">
</style>
