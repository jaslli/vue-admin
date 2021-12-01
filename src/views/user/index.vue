<template>
  <Page :title='title'></Page>
</template>

<script>
import Page from '@/components/page'
export default {
  name: 'User',
  components: { Page },
  data() {
    return {
      title: '用户列表'
    }
  }
}
</script>

<style scoped>
</style>
