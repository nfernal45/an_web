import Vue from 'vue'
import elements from '@/elements'

elements.forEach((element) => {
  Vue.component(element.name, element)
})
