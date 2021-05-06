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
    },
    setShowNotificationDrawer(state, value) {
      state.showNotificationDrawer = value;
    },
  },
  actions: {
    createNotificationInStore(context, notification) {
      context.commit("addNotification", notification);
    },
    updateShowNotificationDrawer(context, value) {
      context.commit("setShowNotificationDrawer", value);
    },
  },
  modules: {},
});
