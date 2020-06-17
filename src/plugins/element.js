import Vue from 'vue'
import {
	Button
} from 'element-ui'
import {
	Form,
	FormItem,
	Message,
	Input,
	Dialog,
	Tag,
	Tree,
	Select,
	Option,
	Cascader
} from 'element-ui'
import {
	Container,
	header,
	aside,
	main,
	Card,
	Row,
	Col,
	Tooltip,
	Pagination
} from 'element-ui'
import {
	Menu,
	Submenu,
	MenuItemGroup,
	MenuItem,
	Breadcrumb,
	BreadcrumbItem
} from 'element-ui'
import {
	Table,
	TableColumn,
	Switch,
	MessageBox
} from 'element-ui'

Vue.prototype.$confirm = MessageBox
Vue.prototype.$message = Message
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(aside)
Vue.use(Container)
Vue.use(header)
Vue.use(main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Option)
Vue.use(Select)
Vue.use(Cascader)

