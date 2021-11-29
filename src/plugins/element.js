import Vue from 'vue'
import {
    Button,
    MessageBox,
    Message,
    Form,
    FormItem,
    Input,
    Container,
    Aside,
    Header,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tabs,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Row,
    Col,
    avatar,
    tabPane,
    main
} from 'element-ui'

Vue.use(Button)
Vue.component(MessageBox)
Vue.component(Message)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Tabs);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(avatar);
Vue.use(tabPane);
Vue.use(main);

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;