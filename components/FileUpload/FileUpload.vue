<template>
  <div :class="styles.attach">
    <div :class="[styles.area, { active: !isMaxFiles }]" ref="area">
      <input
        @change="handleInput"
        :class="styles.input"
        type="file"
        name="file"
        :accept="accept"
        :multiple="false"
        ref="input"
        :disabled="isMaxFiles"
      >
      <div :class="styles.icon">
        <Icon id="attach"/>
      </div>
      <div :class="styles.title">
        <div v-text="placeholder" v-if="selectedFiles.length === 0"></div>
        <div v-for="file in selectedFiles" :key="file.name">
          <div v-text="file.name"></div>
        </div>
      </div>
      <button
        :class="styles.button"
        v-show="selectedFiles.length && remove"
        @click.prevent="removeFile(file)"
      >
        <Icon id="remove"/>
      </button>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon/Icon";

import styles from "./FileUpload.scss?module";

export default {
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "Прикрепить файл"
    },
    multiple: {
      // currently only one file supported
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "image/*"
    },
    max: {
      type: Number,
      default: 1
    },
    value: {
      type: Array,
      // default: []
    },
    remove: {
      type: Boolean,
      default: true
    },
    label: String,
    message: String,
    error: String,
    isError: Boolean,
    isValid: Boolean,
    isDisabled: Boolean
  },
  data() {
    return {
      styles,
      selectedFiles: this.value
    };
  },
  methods: {
    handleInput(e) {
      if (this.isMaxFiles) return;
      let file = e.target.files || e.dataTransfer.files;

      this.selectedFiles.push(file[0]);
      this.$emit("input", this.selectedFiles);
      this.reset();
    },

    removeFile(file) {
      this.selectedFiles = this.selectedFiles.filter(function(value) {
        return value.name !== file.name && value.size !== file.size;
      });
      this.$emit("input", this.selectedFiles);
    },

    reset() {
      try {
        // IE 11 doesn't support setting `input.value` to '' or null
        this.$refs.input.value = "";
      } catch (e) {}
      this.$refs.input.type = "";
      this.$refs.input.type = "file";
    }
  },
  computed: {
    isMaxFiles() {
      return this.selectedFiles.length >= this.max;
    }
  },
  mounted() {
    const self = this;
    let area = this.$refs.area;

    area.addEventListener("dragenter", function(e) {
      if (self.isMaxFiles) return;
      area.classList.add("isDragenter");
    });
    area.addEventListener("dragleave", function(e) {
      e.preventDefault();
      area.classList.remove("isDragenter");
    });
    area.addEventListener("drop", function(e) {
      e.preventDefault();
      if (self.isMaxFiles) return;
      area.classList.remove("isDragenter");
      self.handleInput(e);
    });
    area.addEventListener("dragover", function(e) {
      e.preventDefault();
    });
  }
};
</script>

<style lang="scss">
</style>
