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
  data() {
    return {
      tabIndex: '2'
    }
  },
  computed: {
    editableTabs: {
      get() { return this.$store.getters.editableTabs },
      set() {}
    },
    editableTabsValue: {
      get() { return this.$store.getters.editableTabsValue },
      set() {}
    }
  },
  create() {
    this.$editableTabs = this.$store.getters.editableTabs
    this.editableTabsValue = this.$store.getters.editableTabsValue
  },
  methods: {
    clickTab(target) {
      this.$router.push({ path: target.name })
    },
    removeTab(targetName) {
      this.$store.dispatch('tab/removeTab', targetName).then(() => {
        this.$router.push({ path: this.$store.getters.editableTabsValue })
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
