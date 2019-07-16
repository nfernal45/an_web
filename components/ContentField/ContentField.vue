<template>
  <Field :inline="inline" :label="label" :message="message" :error="error">
    <div :class="styles.content">
      <slot></slot>
    </div>
  </Field>
</template>

<script>
import Field from "../Field/Field";

import styles from "./ContentField.scss?module";

export default {
  components: {
    Field
  },
  props: {
    inline: Boolean,
    label: String,
    message: String,
    error: String,
    content: String
  },
  data() {
    return {
      styles
    };
  }
};
</script>

<style lang="scss">
</style>
