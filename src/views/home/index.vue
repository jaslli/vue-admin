<template>
  <Page :title='title'></Page>
</template>

<script>
import Page from '@/components/page'
export default {
  name: 'Home',
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
