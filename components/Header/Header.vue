<template>
  <header :class="styles.header">
    <div :class="styles.topper">
      <div :class="[styles.container, 'container']">
        <nuxt-link to="/" :class="styles.logo">
          <img src="~/static/img/mgi.png" width="60" alt="mgi" />
          <h1>Подсистема "Реестр сведений о лицензиатах" ЕИС МЖИ</h1>
        </nuxt-link>
        <div :class="styles.group">
          <a href="#" :class="styles.btn">
            <Icon id="user" />
          </a>
          <a href="#" :class="styles.btn">
            <Icon id="logout" />
          </a>
        </div>
      </div>
    </div>
    <div :class="styles.nav">
      <div :class="[styles.container, 'container']">
        <nav :class="styles.list">
          <nuxt-link
            :class="[styles.link, {[styles.disabled] : item.disabled}]"
            :active-class="styles.active"
            v-for="item in nav"
            :to="item.path"
            :key="item.path"
          >
            <span :class="styles.label" v-html="item.name"></span>
          </nuxt-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import Icon from "../Icon/Icon";
import styles from "./Header.scss?module";

export default {
  components: {
    Icon
  },
  data() {
    return {
      styles,
      nav: [
        {
          name: "Выдача лицензий на управление МКД",
          path: "/#",
          disabled: true
        },
        {
          name: "Внесение изменений в реестр лицензий",
          path: "/"
        },
        {
          name: "Журнал передачи данных в ФНС",
          path: "/#",
          disabled: true
        },
        {
          name: "Квалификационные аттестаты",
          path: "/#",
          disabled: true
        }
      ]
    };
  }
};
</script>

<style lang="scss">
</style>
