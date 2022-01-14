<template>
  <el-menu
    default-active="$route.path"
    router
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <!-- LOGO -->
    <Logo />
    <!-- 其他菜单 -->
    <!-- 无子菜单的情况 -->
    <el-menu-item
      v-for="menu in menuList"
      :key="menu.id"
      :index="menu.path"
      v-if="menu.children.length === 0 && !menu.hidden"
      @click="addTags(menu.title, menu.path)"
    >
      <i :class="menu.icon" />
      <span slot="title">{{ menu.title }}</span>
    </el-menu-item>
    <!-- 有子菜单的情况 -->
    <el-submenu v-else-if="!menu.hidden" :index="menu.id">
      <!-- 子菜单的父级 -->
      <template slot="title">
        <i :class="menu.icon" />
        <span slot="title">{{ menu.title }}</span>
      </template>
      <!-- 子菜单 -->
      <el-menu-item
        v-for="child in menu.children"
        :key="child.id"
        :index="child.path"
        @click="addTags(child.title, child.path)"
      >
        <i :class="child.icon" />
        <span slot="title">{{ child.title }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
// import SideItem from './SideItem.vue'
import Logo from "./Logo.vue";
export default {
  name: "Aside",
  components: { Logo },
  data() {
    return {
      isCollapse: false,
      menuList: [],
    };
  },
  created() {
    this.menuList = this.$store.getters.menuList;
  },
  methods: {
    // 头部导航条的添加
    addTags(title, path) {
      const one = {
        title: title,
        name: path,
      };
      let flag = true;
      const list = this.$store.getters.editableTabs;
      list.forEach((element) => {
        if (element.title === one.title) {
          flag = false;
        }
      });
      if (one.name === '/') {
        flag = false;
      }
      if (flag) {
        list.push(one);
        this.$store.commit("tab/SET_EDITABLETABS", list);
      }
      this.$store.commit("tab/SET_EDITABLETABSVALUE", one.name);
    },
    /*
        收缩展开导航菜单
        handleOpen(key, keyPath) {
          console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath)
        }
    */
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 200px;
  height: 100%;
}
.el-menu {
  border-right: none;
}
</style>
