<template>
  <Page :title="title">
    <el-table 
			:data="list"
			border
			row-key="id"
			default-expand-all
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
		>
			<!-- 分类名称 -->
      <el-table-column 
				prop="name" 
				header-align="center"
				label="分类名称" 
			/>
			<!-- 文章数量 -->
      <el-table-column 
				prop="count" 
				header-align="center" 
				align="center" 
				label="包含的文章数量" 
			/>
			<!-- 创建分类的时间 -->
      <el-table-column 
				prop="createTime" 
				header-align="center" 
				align="center" 
				label="创建时间"
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
				header-align="center"
				align="center"
				width="200px"
				label="操作"
			>
        <template slot-scope="scope">
          <el-button 
						size="mini" 
						type="primary"
						v-if="scope.row.children && scope.row.children.length === 0"
						@click="handleEdit(scope.row)"
					>
						查看
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
import { selectAll } from "@/api/category.js"
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
		this.selectAll()
	},
	methods: {
		selectAll() {
			selectAll().then(response => {
				this.list = response.data.list;
			}).catch(error => {
				console.log(error)
			})
		}
	}
};
</script>

<style>
</style>