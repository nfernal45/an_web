<template>
  <div :class="styles.checkbox">
    <label :class="styles.label">
      <input
        :class="styles.input"
        type="checkbox"
        :name="name"
        :value="value"
        :disabled="disabled"
        :required="required"
        :checked="checkboxState"
        @change="toggle()"
      >
      <div :class="styles.content">
        <slot></slot>
      </div>
    </label>
  </div>
</template>

<script>
import styles from "./Checkbox.scss?module";

export default {
  model: {
    prop: "model",
    event: "change"
  },
  props: {
    model: {
      type: Number | Array,
      default: undefined
    },
    checked: Boolean,
    value: Number | String,
    name: String,
    required: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      styles
    };
  },
  computed: {
    checkboxState() {
      if (this.model === undefined) return this.checked;
      if (Array.isArray(this.model))
        return this.model.indexOf(this.value) !== -1;
      return this.model;
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      let value = this.model;
      if (Array.isArray(value)) {
        value = value.slice();
        const i = value.indexOf(this.value);
        if (i === -1) value.push(this.value);
        else value.splice(i, 1);
      } else value = !this.checkboxState;
      this.$emit("change", value);
    }
  }
};
</script>

<style lang="scss">
</style>
