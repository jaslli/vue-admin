<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

html,body,#app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden !important;
}

::selection {
  color: #fff;
  background-color: rgb(144, 129, 241);
}

/* nprogress的颜色 */
#nprogress .bar {
  background: rgb(144, 129, 241) !important;
}
</style>
