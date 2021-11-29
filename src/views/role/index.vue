<template>
  <Page :title='title'></Page>
</template>

<script>
import Page from '@/components/page'
export default {
  components: { Page },
  data() {
    return {
      title: '角色管理'
    }
  }
}
</script>

<style scoped>
</style>
