<template>
  <cv-header aria-label="header">
    <cv-header-menu-button
      aria-label="Header menu"
      aria-controls="side-nav"
      @click="toggleMobileSideMenu"
    />
    <cv-skip-to-content href="#main-content"
      >Skip to content</cv-skip-to-content
    >
    <cv-header-name to="/" prefix="">{{
      $root.config.PRODUCT_NAME
    }}</cv-header-name>
    <cv-header-nav>
      <cv-header-menu-item to="/dashboard?testToggle=true&testInput=firstValue"
        >Link 1</cv-header-menu-item
      >
      <cv-header-menu-item to="/dashboard?testInput=secondValue"
        >Link 2</cv-header-menu-item
      >
      <!-- <cv-header-menu-item to="/dashboard?testToggle=true&testInput=firstValue"
        >Dashboard w/p 1</cv-header-menu-item
      >
      <cv-header-menu-item to="/dashboard?testInput=secondValue"
        >Dashboard w/p 2</cv-header-menu-item
      > -->
      <!--  //// -->
      <!-- <cv-header-menu-item to="/tasks">Tasks</cv-header-menu-item>
      <cv-header-menu-item to="/login">Login</cv-header-menu-item>
      <cv-header-menu-item @click="logout">Logout</cv-header-menu-item>
      <cv-header-menu-item to="/apps/ns8-app">Ns8 app</cv-header-menu-item>
      <cv-header-menu-item to="/apps/ns8-app?appInput=testAppInput"
        >Ns8 app w/p</cv-header-menu-item
      > -->
    </cv-header-nav>
    <template slot="header-global">
      <cv-header-global-action
        v-if="!searchExpanded"
        aria-label="Global search"
        @click="expandSearch"
      >
        <search-20 />
      </cv-header-global-action>
      <GlobalSearch v-else @closeSearch="closeSearch" />
      <cv-header-global-action
        aria-label="Notifications"
        class="notifications-button"
        @click="toggleNotificationDrawer"
      >
        <!-- //// -->
        <!-- <NotificationNew20 v-if="unreadNotificationsCount > 0" />
        <Notification20 v-else /> -->
        <Notification20 />
        <span
          class="notifications-badge"
          v-if="unreadNotificationsCount > 0"
        ></span>
      </cv-header-global-action>
      <cv-header-global-action aria-label="Account">
        <user-avatar-20 />
      </cv-header-global-action>
      <cv-header-global-action aria-label="Applications">
        <app-switcher-20 />
      </cv-header-global-action>
    </template>
    <!-- //// move notification drawer to distinct component -->
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
        <cv-tabs
          class="notification-tabs"
          aria-label="navigate between events and tasks"
        >
          <cv-tab id="events" label="Events" selected>
            <div v-if="!notifications.length">
              <div class="empty-state">
                <pictogram title="empty state" class="image">
                  <ExclamationMark />
                </pictogram>
                <h5 class="title">No notifications</h5>
                <div class="description">
                  You don't have any notifications yet
                </div>
              </div>
            </div>
            <div
              v-else
              v-for="(notification, index) in notifications"
              :key="index"
            >
              <ToastNotification
                :kind="notification.type"
                :title="notification.title"
                :sub-title="notification.text"
                :low-contrast="false"
                :show-close-button="false"
                actionLabel="Details"
                @action="notificationAction"
                :read="notification.read"
                :progress="notification.progress"
                :timestamp="notification.timestamp"
                @click="setNotificationReadInStore(notification.id)"
              />
            </div>
          </cv-tab>
          <cv-tab id="tasks" label="Tasks"> Sample tab panel content 2 </cv-tab>
        </cv-tabs>
      </div>
    </transition>
  </cv-header>
</template>

<script>
import Close20 from "@carbon/icons-vue/es/close/20";
import Notification20 from "@carbon/icons-vue/es/notification/20";
// import NotificationNew20 from "@carbon/icons-vue/es/notification--new/20"; ////
import UserAvatar20 from "@carbon/icons-vue/es/user--avatar/20";
import AppSwitcher20 from "@carbon/icons-vue/es/app-switcher/20";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import ToastNotification from "@/components/ToastNotification";
import Pictogram from "@/components/Pictogram";
import ExclamationMark from "@/components/pictograms/ExclamationMark";
import GlobalSearch from "@/components/GlobalSearch";
import Search20 from "@carbon/icons-vue/es/search/20";
import StorageService from "@/mixins/storage";
import IconService from "@/mixins/icon";

export default {
  name: "ShellHeader",
  components: {
    Close20,
    Notification20,
    // NotificationNew20, ////
    UserAvatar20,
    AppSwitcher20,
    ToastNotification,
    Pictogram,
    ExclamationMark,
    Search20,
    GlobalSearch,
  },
  mixins: [StorageService, IconService],
  data() {
    return {
      searchExpanded: false,
      // viewWidth: document.documentElement.clientWidth, //// remove?
    };
  },
  computed: {
    ...mapState({
      showNotificationDrawer: (state) => state.showNotificationDrawer,
      notifications: (state) => state.notifications,
    }),
    ...mapGetters(["unreadNotifications", "unreadNotificationsCount"]),
  },
  // watch: { ////
  //   viewWidth: function () {
  //     console.log("viewWidth", this.viewWidth); ////
  //   },
  // },
  // created() { ////
  //   window.addEventListener("resize", this.handleViewResize);
  // },
  // beforeDestroy() { ////
  //   window.removeEventListener("resize", this.handleViewResize);
  // },
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
    logout() {
      this.$root.$emit("logout");
    },
    expandSearch() {
      this.searchExpanded = true;
    },
    closeSearch() {
      this.searchExpanded = false;
    },
    toggleMobileSideMenu() {
      this.$root.$emit("toggleMobileSideMenu");
    },
    // handleViewResize() { ////
    //   this.viewWidth = document.documentElement.clientWidth;
    // },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/carbon-utils";

.notification-drawer {
  background-color: $ui-05;
  border-left: 1px solid $interactive-02;
  color: $ui-01;
  width: 28vw; //// fixed to 16rem?
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
  top: 15%;
  left: 62%;
  height: 7px;
  width: 7px;
  background-color: $danger-01;
  border-radius: 50%;
  display: inline-block;
}

.slide-enter-active, //// move to App.vue?
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, //// move to App.vue?
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

.notification-tabs {
  margin-top: $spacing-05;
}
</style>
