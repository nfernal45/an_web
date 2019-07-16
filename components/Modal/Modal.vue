<template>
  <transition name="modal">
    <div :class="styles.modal" ref="modal">
      <div :class="styles.container" :style="{ maxWidth: width }">
        <preloader :isLoading="isLoading"/>
        <button :class="styles.close" @click="$emit('close')">
          <Icon id="remove"/>
        </button>

        <div :class="styles.header">
          <slot name="header"></slot>
        </div>

        <div :class="styles.body">
          <slot name="body"></slot>
        </div>

        <div :class="styles.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from "../Icon/Icon";
import Preloader from "../Preloader/Preloader";

import styles from "./Modal.scss?module";

export default {
  components: {
    Icon,
    Preloader
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: String
  },
  data() {
    return {
      styles
    };
  }
};
</script>

<style lang="scss">
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>

