<template>
  <div id="app">
    <shell-header />
    <cv-content id="#main-content">
      <router-view />
      <toast-notifications />
    </cv-content>
  </div>
</template>

<script>
import ShellHeader from "./components/ShellHeader";
import ToastNotifications from "./components/ToastNotifications";

export default {
  name: "App",
  components: {
    ShellHeader,
    ToastNotifications,
  },
};
</script>

<style lang="scss">
@import "./styles/carbon";

.notification {
  margin-top: 3rem;
}

.mg-top-bottom {
  margin-top: $spacing-05;
  margin-bottom: $spacing-05;
}
</style>
