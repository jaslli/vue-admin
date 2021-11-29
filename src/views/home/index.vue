<template>
  <Page :title='title'></Page>
</template>

<script>
import Page from '@/components/page'
export default {
  components: { Page },
  data() {
    return {
      title: '个人详情页'
    }
  }
}
</script>

<style scoped>
</style>
