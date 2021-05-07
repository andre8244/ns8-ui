import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
    showNotificationDrawer: false,
  },
  getters: {
    unreadNotifications: (state) => {
      return state.notifications.filter((notification) => !notification.read);
    },
    unreadNotificationsCount: (state, getters) => {
      return getters.unreadNotifications.length;
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
  },
  modules: {},
});
