<template>
  <button @click="notice">2333</button>
</template>

<script setup>
import alert from '../components/i-alert'
const notice = () =>
  alert.info({
    content: 'test',
    duration: 2
  })
</script>

<style lang="scss" scoped></style>
