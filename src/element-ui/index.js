import Vue from 'vue'
import "./styles/index.scss";

import {
  Form,
  FormItem,
  Input,
  Button,
  MessageBox,
  Message
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;