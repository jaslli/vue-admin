<template>
  <Page :title='title'></Page>
</template>

<script>
import Page from '@/components/page'
export default {
  name: 'Menu',
  components: { Page },
  data() {
    return {
      title: '菜单管理'
    }
  }
}
</script>

<style scoped>
</style>
