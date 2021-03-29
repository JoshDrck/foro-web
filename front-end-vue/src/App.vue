<template>
  <div id="app">
    <Foro />
  </div>
</template>

<script>
import Foro from "./components/foro.vue";

export default {
  name: "App",
  components: {
    Foro,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
