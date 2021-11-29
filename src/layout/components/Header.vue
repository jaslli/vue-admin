<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item 
        v-for='(item,index) in matched' 
        key="item"
      >
        首页
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="large" :src="userInfo.avatar" />
        <div class="userName">{{ userInfo.username }}</div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button class="button" type="text">个人中心</el-button>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-button class="button" type="text" @click="doLogout">退出登录</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      // 用户信息
      userInfo: {
        username: '',
        avatar: '',
        roles: ''
      },
      // 路由信息
      matched: []
    }
  },
  created() {
    this.userInfo.username = this.$store.getters.username
    this.userInfo.avatar = this.$store.getters.avatar
    this.userInfo.roles = this.$store.getters.roles
  },
  watch: {
    $route() {
      this.matched = this.$route.matched
      console.log(this.matched)
    }
  },
  methods: {
    doLogout() {
      this.$confirm('确认退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$store.dispatch('user/doLogout').then(() => {
          this.$message.success('退出成功')
          this.$router.replace({ path: '/login' })
        }).catch(error => {
          this.$message.error(error)
        })
      }).catch((error) => {
        this.$message.error(error)
      })
    }
  }
}

</script>

<style scoped>
  .header {
    height: 100%;
  }
  .header .el-breadcrumb {
    margin-top: 25px;
    float: left;
  }
  .header .el-breadcrumb .el-breadcrumb-item{
    margin: auto 0;
  }
  .button{
    color: #333;
  }
  .el-dropdown {
    float: right;
    margin-top: 10px;
  }
  .el-dropdown .userName{
    margin: auto 0 auto 8px;
    color: #606266;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    display: flex;
  }

</style>
