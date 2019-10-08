<template lang="pug">
  div.flex.justify-center(v-show="isReady" style="background:#f8f8f8")
    the-header
    el-container.flex-wrap(style="padding-top:80px;position:relative;")
      the-tabs(style="flex-basis:100%;")
      the-aside.sticky-aside(style="flex-basis:200px;")
      el-main(style="flex:1")
        nuxt
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheAside from '@/components/TheAside'
import TheTabs from '@/components/TheTabs'

export default {
  components: {
    TheHeader,
    TheAside,
    TheTabs
  },
  data() {
    return {
      isReady: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isReady = true
    })
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
