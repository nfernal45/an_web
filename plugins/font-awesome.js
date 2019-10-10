import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faSignOutAlt,
  faCircle,
  faPrint,
  faSave,
  faReply,
  faChevronUp,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faSignOutAlt,
  faCircle,
  faPrint,
  faSave,
  faReply,
  faChevronUp,
  faChevronDown
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
