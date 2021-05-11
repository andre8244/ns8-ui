<template>
  <cv-header aria-label="Carbon tutorial">
    <cv-skip-to-content href="#main-content"
      >Skip to content</cv-skip-to-content
    >
    <cv-header-name to="/" prefix="">{{ PRODUCT_NAME }}</cv-header-name>
    <cv-header-nav>
      <cv-header-menu-item to="/dashboard">Dashboard</cv-header-menu-item>
      <cv-header-menu-item to="/about">About</cv-header-menu-item>
    </cv-header-nav>
    <template slot="header-global">
      <cv-header-global-action
        aria-label="Notifications"
        class="notifications-button"
        @click="toggleNotificationDrawer"
      >
        <NotificationNew20 v-if="unreadNotificationsCount > 0" />
        <Notification20 v-else />
        <!-- //// remove -->
        <!-- <span class="notifications-badge"></span> -->
      </cv-header-global-action>
      <cv-header-global-action aria-label="User avatar">
        <user-avatar-20 />
      </cv-header-global-action>
      <cv-header-global-action aria-label="App switcher">
        <app-switcher-20 />
      </cv-header-global-action>
    </template>
    <transition name="slide">
      <div v-if="showNotificationDrawer" class="notification-drawer">
        <div class="notification-drawer__header">
          <h4>Notifications</h4>
          <span>{{ unreadNotificationsCount }} unread</span>
          <button
            aria-label="close"
            type="button"
            data-notification-btn
            class="bx--toast-notification__close-button close-notifications-button"
            @click="closeDrawer"
          >
            <Close20 class="bx--toast-notification__close-icon" />
          </button>
        </div>
        <div v-if="!notifications.length">
          <div class="empty-state">
            <pictogram title="empty state" class="image">
              <ExclamationMark />
            </pictogram>
            <h5 class="title">No notifications</h5>
            <div class="description">You don't have any notifications yet</div>
          </div>
        </div>
        <div v-else v-for="(notification, index) in notifications" :key="index">
          <toast-notification
            :kind="notification.type"
            :title="notification.title"
            :sub-title="notification.text"
            :low-contrast="false"
            :show-close-button="false"
            actionLabel="Details"
            @action="notificationAction"
            :read="notification.read"
            :timestamp="notification.timestamp"
            @click="setNotificationReadInStore(notification.id)"
          />
        </div>
      </div>
    </transition>
  </cv-header>
</template>

<script>
import ConfigurationService from "@/mixins/configuration";
import Notification20 from "@carbon/icons-vue/es/notification/20";
import NotificationNew20 from "@carbon/icons-vue/es/notification--new/20";
import UserAvatar20 from "@carbon/icons-vue/es/user--avatar/20";
import AppSwitcher20 from "@carbon/icons-vue/es/app-switcher/20";
import Close20 from "@carbon/icons-vue/es/close/20";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import ToastNotification from "@/components/ToastNotification";
import Pictogram from "@/components/Pictogram";
import ExclamationMark from "@/components/pictograms/ExclamationMark";

export default {
  name: "ShellHeader",
  components: {
    Notification20,
    NotificationNew20,
    UserAvatar20,
    AppSwitcher20,
    ToastNotification,
    Pictogram,
    ExclamationMark,
    Close20, //// move to mixin
  },
  mixins: [ConfigurationService],
  data() {
    return {
      Close20, //// move to mixin
    };
  },
  computed: {
    ...mapState({
      showNotificationDrawer: (state) => state.showNotificationDrawer,
      notifications: (state) => state.notifications,
    }),
    ...mapGetters(["unreadNotifications", "unreadNotificationsCount"]),
  },
  methods: {
    ...mapActions([
      "setShowNotificationDrawerInStore",
      "setNotificationReadInStore",
    ]),
    toggleNotificationDrawer() {
      this.setShowNotificationDrawerInStore(!this.showNotificationDrawer);
    },
    closeDrawer() {
      this.setShowNotificationDrawerInStore(false);
    },
    notificationAction() {
      console.log("notificationAction"); ////
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
  width: 28vw;
  min-width: 23rem;
  height: calc(100vh - 3rem);
  position: fixed;
  top: 3rem;
  right: 0;
  z-index: 10000;
  overflow: auto;
  padding: 1rem;
}

.notifications-button {
  position: relative;
}

.notifications-badge {
  position: absolute;
  top: 12%;
  left: 62%;
  height: 7px;
  width: 7px;
  background-color: $danger-01;
  border-radius: 50%;
  display: inline-block;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(30vw);
}

.close-notifications-button {
  margin: 0;
  width: auto;
  min-width: auto;
  height: auto;
  min-height: auto;
}

.notification-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
