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
  faChevronDown,
  faPen
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faSignOutAlt,
  faCircle,
  faPrint,
  faSave,
  faReply,
  faChevronUp,
  faChevronDown,
  faPen
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
