<template>
  <div class="page-contanier">
    <div class="page-title">
      <span>{{ title }}</span>
    </div>
    <div class="page-context">
      <slot />
    </div>
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

.page-contanier .page-title {
  background: transparent;
  width: 100%;
  color: #9081F1;
  padding: 20px 0;
}

.page-contanier .page-title span{
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
}

.page-contanier .page-context {
  background: #fff;
  margin: 0px 20px;
  min-height: 100px;
}

</style>