import Vue from 'vue'
import { Button, Container, Header, Row, Col, Aside, Main } from 'element-ui'
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
