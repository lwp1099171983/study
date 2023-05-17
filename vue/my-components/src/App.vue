<template>
  <formDemo />
</template>

<script>
import formDemo from './demo/form-demo.vue'
export default {
  name: 'App',
  components: {
    formDemo
  },
  setup() {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
