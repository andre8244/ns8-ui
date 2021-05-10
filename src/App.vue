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

.notification {
  margin-top: 3rem;
}

.mg-top-bottom {
  margin-top: $spacing-05;
  margin-bottom: $spacing-05;
}

.Vue-Toastification__container.top-right.toastification-container {
  top: 3rem;
  z-index: 7999;
}

.Vue-Toastification__toast--default.toastification-toast {
  background-color: transparent;
  padding: 0;
  margin-bottom: 0;
}

.empty-state {
  text-align: center;
  margin: $spacing-09;
}

.empty-state .image {
  margin-bottom: $spacing-05;
}

.empty-state .title {
  margin-bottom: $spacing-05;
}

.empty-state .description {
  margin-bottom: $spacing-05;
}

// timestamp tooltip
.timestamp button span {
  background-color: $ui-05 !important;
}
.timestamp
  .bx--tooltip__trigger.bx--tooltip--bottom.bx--tooltip--align-center::before {
  border-bottom-color: $ui-05 !important;
}
</style>
