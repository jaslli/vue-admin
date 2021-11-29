<template>
  <div class="page-contanier">
    <div class="page-title">
      <span>{{ title }}</span>
    </div>
		<slot />
  </div>
</template>

<script>
/** 
 * Page页面组件
 * 传入参数
 *    - title 标题
*/
export default {
  name: "page",
	props: {
		title: {
			type: String,
			required: true
		}
	}
};
</script>

<style scoped>

.page-contanier {
  background: #fff;
}

.page-contanier .page-title {
  padding: 15px 0 50px 0px;
}

.page-contanier .page-title span{
  font-size: 20px;
  font-weight: bold;
  border-left: 3px solid #9081F1;
  padding-left: 30px;
}

/* .page-contanier .el-table {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
} */

</style>