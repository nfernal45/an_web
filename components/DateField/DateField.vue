<template>
  <Field
    :class="{[styles.inline]: inline}"
    :inline="inline"
    :label="label"
    :message="message"
    :error="error"
    icon="date"
  >
    <div
      :class="[{ 'date-inline': inline, 'date-error': isError, 'date-valid': isValid, 'date-disabled': isDisabled }]"
    >
      <no-ssr>
        <date-picker
          v-model="content"
          @input="handleInput"
          :lang="lang"
          format="DD.MM.YYYY"
          :first-day-of-week="1"
          value-type="format"
          input-class="input"
          :placeholder="placeholder"
          width="100%"
          :clearable="false"
          :not-before="minDate"
          :not-after="maxDate"
        ></date-picker>
      </no-ssr>
    </div>
  </Field>
</template>

<script>
import Field from "../Field/Field";
import Icon from "../Icon/Icon";

import styles from "./DateField.scss?module";


export default {
  components: {
    Field,
    Icon
  },
  props: {
    type: {
      label: String,
      type: String,
      default: "text"
    },
    placeholder: String,
    value: String,
    inline: Boolean,
    label: String,
    message: String,
    error: String,
    isError: Boolean,
    isValid: Boolean,
    isDisabled: Boolean,
    minDate: [String, Date],
    maxDate: [String, Date]
  },
  watch: {
    value(val) {
      this.content = val;
    }
  },
  data() {
    return {
      styles,
      content: this.value,
      lang: {
        days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь"
        ],
        placeholder: {
          date: "Выберите дату"
        }
      }
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content);
    }
  }
};
</script>

<style lang="scss">
.mx {
  &-input-append {
    display: none;
    pointer-events: none;
  }
  &-datepicker-popup {
    border-radius: 4px;
    box-shadow: 0px 15px 32px rgba(0, 0, 0, 0.12);
    border: 0;
  }
  &-calendar {
    padding: 12px;
    font-family: "OpenSans", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
  }
  &-calendar-header {
    line-height: 21px;
  }
  &-icon-last-year,
  &-icon-next-year {
    display: none;
  }
  &-calendar-panel-year &-icon-last-year,
  &-calendar-panel-year &-icon-next-year {
    display: block;
    line-height: 19px;
  }
  &-icon-last-month,
  &-icon-next-month {
    font-size: 0;
    display: block;
    width: 24px;
    height: 24px;
    padding: 0;
    opacity: 0.3;
    transition: 0.2s ease;
    &:before {
      display: block;
      width: 24px;
      height: 24px;
      content: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTE1LjQxIDE2LjQwNjRMMTAuODMgMTJsNC41OC00LjQwNjQxTDE0IDYuMjM5OTkgOCAxMmw2IDUuNzYgMS40MS0xLjM1MzZ6Ii8+PC9zdmc+);
    }
    &:hover {
      opacity: 0.5;
    }
    &:active {
      opacity: 0.7;
    }
  }
  &-icon-last-month {
    margin-left: -5px;
  }
  &-icon-next-month {
    margin-right: -5px;
    &:before {
      transform: rotate(180deg);
    }
  }
  &-current-month,
  &-current-year {
    font-weight: bold;
    &:hover {
      color: #0e69af !important;
    }
  }
  &-current-month:after {
    content: ",";
  }
  &-calendar-content .cell {
    font-weight: 600;
    border-radius: 16px;
    padding: 0 5px;
    font-size: 12px;
    line-height: 30px;
    &.actived {
      background-color: #0e69af;
    }
    &.today {
      color: #0e69af;
      font-weight: 600;
    }
  }
  &-panel-date th {
    height: 33px;
    padding-bottom: 4px;
  }
  &-panel-date td.last-month,
  &-panel-date td.next-month {
    color: #ccc;
  }
  &-panel-month {
    padding-top: 16px;
  }
  &-panel-year {
    padding-top: 30px;
  }
}

.date-error .input {
  border-color: #ff6633;
}
</style>
