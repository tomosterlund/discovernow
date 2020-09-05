<template>
  <div id="app" class="main-container">
    <app-index />
  </div>
</template>

<script>
import appHeader from './components/mainComponents/Header'
import appIndex from './components/publicPages/AppIndex'

export default {
  components: {
    appHeader,
    appIndex
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
