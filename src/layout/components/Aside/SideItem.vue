<template>
  <div v-if="!item.hidden">
    <template v-if="!hasChildren(item.children)">
      <el-submenu v-for="(menu,index) in item" :key="index" :index="menu.path">
        <template slot="title">
          <i :class="menu.icon" />
          <span slot="title">{{ menu.title }}</span>
        </template>
        <el-menu-item v-for="(child,indexc) in menu.children" :key="indexc" :index="child.path">
          <i :class="child.icon" />
          <span slot="title">{{ child.title }}</span>
        </el-menu-item>
      </el-submenu>
    </template>

    <el-menu-item v-else index="item.path">
      <i class="item.icon" />
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SideItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasChildren(children) {
      const list = children.filters(item => {
        if (item.hidden) {
          return false
        }
      })
      if (list.length === 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style>

</style>
