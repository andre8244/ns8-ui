import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
    showNotificationDrawer: false,
  },
  mutations: {
    addNotification(state, notification) {
      state.notifications.unshift(notification);

      console.log("state.notifications", state.notifications); ////
    },
    setShowNotificationDrawer(state, value) {
      state.showNotificationDrawer = value;

      console.log("state.showNotificationDrawer", state.showNotificationDrawer); ////
    },
  },
  actions: {
    createNotification(context, notification) {
      context.commit("addNotification", notification);
    },
    updateShowNotificationDrawer(context, value) {
      context.commit("setShowNotificationDrawer", value);
    },
  },
  modules: {},
});
