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
  Notification,
  Tag,
  Input,
  Form,
  FormItem,
  Card,
  Radio,
  Select,
  DatePicker
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-Ru'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Header)
Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Aside)
Vue.use(Main)
Vue.use(ButtonGroup)
Vue.use(Tag)
Vue.use(Input)
Vue.use(Form)
Vue.use(Card)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(Select)
Vue.use(DatePicker)

Vue.prototype.$notify = Notification
