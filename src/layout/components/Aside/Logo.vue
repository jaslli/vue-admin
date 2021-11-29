<template>
  <div class="logo-container">
    <img :src="logo" alt="logo">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data() {
    return {
      title: '后台管理系统',
      logo: 'https://img.yww52.com/icon.ico'
    }
  }
}
</script>

<style>
.logo-container {
  width: 200px;
  height: 56px;
  display: flex;
  justify-content: center;
}
.logo-container img{
  width: 32px;
  height: 32px;
  margin: auto 0;
}

</style>
