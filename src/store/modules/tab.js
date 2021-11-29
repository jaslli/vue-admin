const state = {
    // 动态标签页默认展示
    editableTabsValue: '/',
    // 动态标签页数组
    editableTabs: [],
}

// 准备mutations-用于操作数据（state）
const mutations = {
    SET_EDITABLETABS: (state, editableTabs) => {
        state.editableTabs = editableTabs
    },
    SET_EDITABLETABSVALUE: (state, editableTabsValue) => {
        state.editableTabsValue = editableTabsValue
    }
}

const actions = {

    // 删除标签
    removeTab({
        commit,
        state
    }, targetName) {
        const tabs = state.editableTabs
        let activeName = state.editableTabsValue
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }
        commit('SET_EDITABLETABSVALUE', activeName)
        commit('SET_EDITABLETABS', tabs.filter(tab => tab.name !== targetName))
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}