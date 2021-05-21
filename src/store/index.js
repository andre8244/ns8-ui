import Vue from "vue";
import Vuex from "vuex";
import _merge from "lodash/merge";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
    showNotificationDrawer: false,
  },
  getters: {
    unreadNotifications: (state) => {
      return state.notifications.filter(
        (notification) => !notification.read && !notification.isTask
      );
    },
    unreadNotificationsCount: (state, getters) => {
      return getters.unreadNotifications.length;
    },
    ongoingNotifications: (state) => {
      return state.notifications.filter((notification) => notification.isTask);
    },
    recentNotifications: (state) => {
      return state.notifications.filter((notification) => !notification.isTask);
    },
  },
  mutations: {
    createNotification(state, notification) {
      state.notifications.unshift(notification);
    },
    setShowNotificationDrawer(state, value) {
      state.showNotificationDrawer = value;
    },
    setNotificationRead(state, notificationId) {
      const notification = state.notifications.find(
        (n) => n.id == notificationId
      );

      if (notification) {
        notification.read = true;
      }
    },
    updateNotification(state, notification) {
      let notificationFound = state.notifications.find(
        (n) => n.id == notification.id
      );

      if (notificationFound) {
        console.log("updating, old", notificationFound); ////
        console.log("updating, new", notification); ////
        notificationFound = _merge(notificationFound, notification);

        console.log("updated notification", notificationFound); ////
      }
    },
  },
  actions: {
    createNotificationInStore(context, notification) {
      context.commit("createNotification", notification);
    },
    setShowNotificationDrawerInStore(context, value) {
      context.commit("setShowNotificationDrawer", value);
    },
    setNotificationReadInStore(context, notificationId) {
      context.commit("setNotificationRead", notificationId);
    },
    updateNotificationInStore(context, notification) {
      context.commit("updateNotification", notification);
    },
  },
  modules: {},
});
