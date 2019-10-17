import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Row,
  Col,
  Aside,
  Main,
  ButtonGroup,
  Loading,
  Spinner,
  MessageBox
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-Ru'
import locale from 'element-ui/lib/locale'

// Loading.service()

locale.use(lang)

Vue.use(Button)
Vue.use(Header)
Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Aside)
Vue.use(Main)
Vue.use(ButtonGroup)
Vue.use(Spinner)
Vue.use(Loading.directive)

Vue.prototype.$confirm = MessageBox.confirm
