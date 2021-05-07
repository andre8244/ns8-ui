import { mapActions } from "vuex";
import ToastNotification from "@/components/ToastNotification";

export default {
  name: "NotificationService",
  methods: {
    ...mapActions(["createNotificationInStore"]),
    createNotification(notification) {
      // fill missing attributes
      if (!notification.type) {
        notification.type = "info";
      }

      if (notification.read == undefined) {
        notification.read = false;
      }

      //// need to generate a unique id for notifications?
      if (!notification.id) {
        notification.id = new Date().getTime();

        if (!notification.timestamp) {
          notification.timestamp = notification.id;
        }
      }

      // create notification in vuex store
      this.createNotificationInStore(notification);

      // show toast notification
      const toast = {
        component: ToastNotification,
        props: {
          kind: notification.type,
          title: notification.title,
          subTitle: notification.text,
          actionLabel: "Details", ////
          lowContrast: false,
          showCloseButton: true,
        },
        listeners: {
          action: () => console.log("Clicked toast action!"), ////
        },
      };

      let toastTimeout;

      switch (notification.type) {
        case "error":
        case "warning":
          toastTimeout = 10000;
          break;
        default:
          toastTimeout = 5000;
      }

      this.$toast(toast, {
        timeout: toastTimeout,
      });
    },
  },
};
