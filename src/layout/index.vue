<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <Aside />
    </el-aside>
    <el-container>
      <el-header height="65px">
        <Header />
      </el-header>
      <Tabs />
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/layout/components/Aside'
import Header from '@/layout/components/Header'
import Main from '@/layout/components/Main.vue'
import Tabs from '@/layout/components/Tabs.vue'

export default {
  name: 'Layout',
  components: { Aside, Header, Main, Tabs }
}
</script>

<style scoped>
  .el-container {
    height: 100%;
  }

  .el-main {
    background-color: #F7F9FB;
    color: #333;
    height: 100%;

  }
  .el-header {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
