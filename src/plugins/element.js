import Vue from 'vue'
import { Button } from 'element-ui'
import { Form,FormItem } from 'element-ui'
import { Input } from 'element-ui'
import { Message } from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$message = Message
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
