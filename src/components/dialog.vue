<template>
  <div class="dialog" v-show="">
    
  </div>
</template>

<script>
/** 
 * 弹窗组件
 * 传入参数
 *    - title 标题
*/
export default {
  name: "dialog",
	props: {
		title: {
			type: String,
			required: true
		}
	}
};
</script>

<style scoped>

</style>