<template>
  <HelloWorld ref="hello" msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const hello = ref(null)

    onMounted(() => {
      console.log('hello', hello.value)
    })

    return {
      hello
    }
  }
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
