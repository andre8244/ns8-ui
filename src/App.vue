<template>
  <div id="app">
    <shell-header />
    <cv-content id="#main-content">
      <router-view />
    </cv-content>
  </div>
</template>

<script>
import ShellHeader from "./components/ShellHeader";

export default {
  name: "App",
  components: {
    ShellHeader,
  },
};
</script>

<style lang="scss">
@import "./styles/carbon";
</style>
