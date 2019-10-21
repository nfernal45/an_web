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
  MessageBox,
  Notification,
  Tag,
  Input,
  Form,
  FormItem,
  Card,
  Radio,
  Select,
  Option,
  DatePicker,
  CheckboxGroup,
  Checkbox,
  RadioGroup
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-Ru'
import locale from 'element-ui/lib/locale'

// Loading.service()

locale.use(lang)

Vue.use(Checkbox)
Vue.use(CheckboxGroup)
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
Vue.use(Tag)
Vue.use(Input)
Vue.use(Form)
Vue.use(Card)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(RadioGroup)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
