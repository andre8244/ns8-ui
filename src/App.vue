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
import axios from "axios";
import StorageService from "@/mixins/storage";
import WebSocketService from "@/mixins/websocket";

export default {
  name: "App",
  components: {
    ShellHeader,
  },
  mixins: [StorageService, WebSocketService],
  created() {
    // register to logout event
    this.$root.$on("logout", this.logout);

    this.initWebSocket();

    this.configureAxiosInterceptors();
  },
  beforeDestroy() {
    // remove all event listeners
    this.$root.$off();

    this.closeWebSocket();
  },
  methods: {
    configureAxiosInterceptors() {
      const context = this;
      axios.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          // logout if 401 response code is intercepted
          if (error.response && error.response.status == 401) {
            context.$root.$emit("logout");
          }
          return Promise.reject(error);
        }
      );
    },
    logout() {
      this.deleteFromStorage("loggedUser");

      // redirect to login page
      if (this.$route.name !== "Login") {
        this.$router.push("login");
      }
    },
  },
};
</script>

<style lang="scss">
@import "./styles/carbon";

a {
  cursor: pointer;
}

.notification {
  margin-top: 3rem;
}

.mg-top-bottom {
  margin-top: $spacing-05;
  margin-bottom: $spacing-05;
}

.mg-bottom-md {
  margin-bottom: $spacing-05 !important;
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

.page-title {
  margin-top: $spacing-07;
  margin-bottom: $spacing-05;
}

.content-tile {
  margin-top: $spacing-05;
  margin-bottom: $spacing-05;
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
