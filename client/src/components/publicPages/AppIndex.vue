<template>
  <div id="app" class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from './../mainComponents/Header'

export default {
  components: {
    appHeader,
  }
}
</script>

<style lang="scss">
  body {
        margin: 0;
        padding: 0;
    }
  .main-container {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
</style>
