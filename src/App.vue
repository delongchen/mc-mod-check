<script setup lang="ts">
import ModReader from './components/ModReader.vue'
import fabricModsStore from './store/fabricModsStore';

fabricModsStore.provideStore()
</script>

<template>
  <mod-reader/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
