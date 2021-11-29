const getters = {
    userId: state => state.user.userId,
    token: state => state.user.token,
    username: state => state.user.username,
    avatar: state => state.user.avatar,
    roles: state => state.user.roles,
    menuList: state => state.user.menuList,
    editableTabs: state => state.tab.editableTabs,
    editableTabsValue: state => state.tab.editableTabsValue
}
export default getters
