<template>
  <Field :inline="inline" :label="label" :message="message" :error="error" :icon="icon">
    <div :class="styles.row">
      <div :class="styles.col">
        <input :class="['input', styles.input]" type="text">
      </div>
      <div :class="styles.col">
        <button :class="[styles.button, styles.menu]">
          <Icon id="more" />
        </button>
      </div>
      <div :class="styles.col">
        <button :class="styles.button">
          <Icon id="search" />
        </button>
      </div>
    </div>
  </Field>
</template>

<script>
import Field from "../Field/Field";
import Icon from "../Icon/Icon";

import styles from "./ActionsField.scss?module";

export default {
  components: {
    Field,
    Icon
  },
  props: {
    inline: Boolean,
    label: String,
    message: String,
    error: String
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
