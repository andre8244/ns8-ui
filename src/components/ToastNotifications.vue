<template>
  <notifications>
    <template slot="body" slot-scope="{ item, close }">
      <custom-notification
        :kind="item.type === 'warn' ? 'warning' : item.type"
        :title="item.title"
        :sub-title="item.text"
        @action="notificationAction"
        action-label="Details"
        @close="close"
        :low-contrast="false"
        :showCloseButton="true"
      />
    </template>
  </notifications>
</template>

<script>
import CustomNotification from "./CustomNotification";

export default {
  name: "ToastNotifications",
  components: { CustomNotification },
  methods: {
    // getTextHtml(item) { ////
    //   return (
    //     '<span style="display: inline-block; margin-top: 0.5rem">' +
    //     item.text +
    //     "</span>"
    //   );
    // },
    // getActionHtml(item) { ////
    //   return ' <a href="notifications/' + item.data.id + '">Details</a>';
    // },
    notificationAction() {
      console.log("notificationAction"); ////
    },
  },
};
</script>

<style scoped lang="scss">
.vue-notification-group {
  margin-top: 3rem;
}
</style>
