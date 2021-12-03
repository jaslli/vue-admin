<template>
  <Page :title="title">
    <el-table :data="list" border>
      <el-table-column prop="avatar" label="头像" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column label="是否禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  </Page>
</template>

<script>
import Page from "@/components/page";
export default {
  name: "User",
  components: { Page },
  data() {
    return {
      title: "用户列表",
      list: [
        {
          avatar: "https://img.yww52.com/avatar.jpg",
          username: "yww",
          nickname: "wslioy",
          isEnable: true,
          roleName: "管理员",
          email: "1141950370@qq.com",
        },
        {
          avatar: "https://img.yww52.com/avatar.jpg",
          username: "yww",
          nickname: "wslioy",
          isEnable: "true",
          roleName: "管理员",
          email: "1141950370@qq.com",
        },
        {
          avatar: "https://img.yww52.com/avatar.jpg",
          username: "yww",
          nickname: "wslioy",
          isEnable: "true",
          roleName: "管理员",
          email: "1141950370@qq.com",
        },
        {
          avatar: "https://img.yww52.com/avatar.jpg",
          username: "yww",
          nickname: "wslioy",
          isEnable: "true",
          roleName: "管理员",
          email: "1141950370@qq.com",
        },
        {
          avatar: "https://img.yww52.com/avatar.jpg",
          username: "yww",
          nickname: "wslioy",
          isEnable: "true",
          roleName: "管理员",
          email: "1141950370@qq.com",
        },
        {
          avatar: "https://img.yww52.com/avatar.jpg",
          username: "yww",
          nickname: "wslioy",
          isEnable: "true",
          roleName: "管理员",
          email: "1141950370@qq.com",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
