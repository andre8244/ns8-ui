<template>
  <cv-header aria-label="Carbon tutorial">
    <cv-skip-to-content href="#main-content"
      >Skip to content</cv-skip-to-content
    >

    <cv-header-name to="/" prefix="">NethServer 8</cv-header-name>

    <cv-header-nav>
      <cv-header-menu-item to="/about">About</cv-header-menu-item>
    </cv-header-nav>

    <template slot="header-global">
      <cv-header-global-action aria-label="Notifications">
        <notification-20 @click="toggleNotificationDrawer" />
      </cv-header-global-action>
      <cv-header-global-action aria-label="User avatar">
        <user-avatar-20 />
      </cv-header-global-action>
      <cv-header-global-action aria-label="App switcher">
        <app-switcher-20 />
      </cv-header-global-action>
    </template>
    <div v-if="showNotificationDrawer" class="notification-drawer">
      &nbsp;asdf ////
      <div v-for="(notification, index) in notifications" :key="index">
        <custom-notification
          :kind="notification.type === 'warn' ? 'warning' : notification.type"
          :title="notification.title"
          :sub-title="notification.text"
          :low-contrast="false"
        />
      </div>
    </div>
  </cv-header>
</template>

<script>
import Notification20 from "@carbon/icons-vue/es/notification/20";
import UserAvatar20 from "@carbon/icons-vue/es/user--avatar/20";
import AppSwitcher20 from "@carbon/icons-vue/es/app-switcher/20";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import CustomNotification from "@/components/CustomNotification";

export default {
  name: "ShellHeader",
  components: {
    Notification20,
    UserAvatar20,
    AppSwitcher20,
    CustomNotification,
  },
  computed: {
    ...mapState({
      showNotificationDrawer: (state) => state.showNotificationDrawer,
      notifications: (state) => state.notifications,
    }),
  },
  methods: {
    ...mapActions(["updateShowNotificationDrawer"]),
    toggleNotificationDrawer() {
      this.updateShowNotificationDrawer(!this.showNotificationDrawer);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/carbon-utils";

.notification-drawer {
  background-color: $ui-05;
  border-left: 1px solid $interactive-02;
  color: $ui-01;
  height: 10rem;
  width: 25rem;
  height: 100vh;
  position: fixed;
  top: 3rem;
  right: 0;
  z-index: 8000;
  overflow: auto;
  padding: 0.5rem;
}
</style>
