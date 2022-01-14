<template>
  <Page :title="title">
    <!-- 没有数据的空状态 -->
    <el-empty v-if="list.length === 0">
      <el-button type="success">插入数据</el-button>
    </el-empty>
    <!-- 有数据时的数据表格状态 -->
    <el-table
      v-else
      row-key="id"
      border
      :data="list"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- 分类名称 -->
      <el-table-column label="分类名称" prop="name" header-align="center" width="200px" />
      <!-- 文章数量 -->
      <el-table-column
        label="包含的文章数量"
        header-align="center"
        align="center"
        width="400px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.count === 0">
            暂无文章
          </div>
          <div v-else>
            {{scope.row.count}}
          </div>
        </template>
      </el-table-column>
      <!-- 创建分类的时间 -->
      <el-table-column
        label="创建时间"
        prop="createTime"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">
            {{ scope.row.createTime }}
          </span>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column
        label="操作"
        header-align="center"
        align="center"
        width="400px"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="!scope.row.children || scope.row.children.length === 0"
            @click="handleEdit(scope.row)"
          >
            查看
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row)"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </Page>
</template>

<script>
import Page from "@/components/page.vue";
import { selectAll } from "@/api/category.js";
export default {
  name: "Category",
  components: { Page },
  data() {
    return {
      title: "分类管理",
      list: [],
    };
  },
  created() {
    this.selectAll();
  },
  methods: {
    selectAll() {
      selectAll()
        .then((response) => {
          this.list = response.data.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>