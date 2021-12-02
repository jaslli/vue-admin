<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="clickTab"
  >
    <el-tab-pane
      label="首页"
      name="/"
      closable
    />
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    />
  </el-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  computed: {
    editableTabs: {
      get() { return this.$store.getters.editableTabs },
      set() {}
    },
    editableTabsValue: {
      get() { return this.$route.path },
      set() {}
    }
  },
  create() {
    this.editableTabs = this.$store.getters.editableTabs
    this.editableTabsValue = this.$store.getters.editableTabsValue
  },
  methods: {
    // 点击标签进行页面跳转
    clickTab(target) {
      if (this.$route.path !== target.name) {
        this.$router.push({ path: target.name })
      }
    },
    // 删除标签
    removeTab(targetName) {
      this.$store.dispatch('tab/removeTab', targetName).then(() => {
        if (this.$route.path !== this.$store.getters.editableTabsValue) {
          this.$router.push({ path: this.$store.getters.editableTabsValue })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped>

.el-tabs {
    height: 42px;
    border-bottom: 1px solid rgb(0, 217, 255);
}
</style>
