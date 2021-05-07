<template>
  <div>
    <div
      data-notification
      :class="[
        `cv-notifiation ${carbonPrefix}--toast-notification`,
        `${carbonPrefix}--toast-notification--${kind.toLowerCase()}`,
        { [`${carbonPrefix}--toast-notification--low-contrast`]: lowContrast },
        `notification`,
        { 'notification-read': read },
      ]"
      v-on="$listeners"
      :role="isAlert ? 'alert' : undefined"
      :aria-live="!isAlert ? 'polite' : false"
    >
      <component
        :is="icon"
        :class="`${carbonPrefix}--toast-notification__icon`"
      />
      <div :class="`${carbonPrefix}--toast-notification__details`">
        <h3 :class="`${carbonPrefix}--toast-notification__title`">
          {{ title }}
        </h3>
        <p
          :class="[
            `${carbonPrefix}--toast-notification__subtitle`,
            `notification-text`,
          ]"
          v-html="subTitle"
        ></p>
        <p
          v-if="caption"
          :class="[
            `${carbonPrefix}--toast-notification__caption`,
            `notification-caption`,
          ]"
          v-html="caption"
        ></p>
        <p
          v-if="actionLabel"
          :class="[`${carbonPrefix}--toast-notification__caption`, `action`]"
        >
          <cv-link @click="$emit('action')" :class="`action-button`">
            {{ actionLabel }}
          </cv-link>
        </p>
      </div>
      <button
        v-if="showCloseButton"
        :aria-label="closeAriaLabel"
        type="button"
        data-notification-btn
        :class="`${carbonPrefix}--toast-notification__close-button`"
        @click="$emit('close-toast')"
      >
        <Close20 :class="`${carbonPrefix}--toast-notification__close-icon`" />
      </button>
    </div>
  </div>
</template>

<script>
import { CvToastNotification } from "@carbon/vue";

export default {
  name: "ToastNotification",
  extends: CvToastNotification,
  props: {
    showCloseButton: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    actionLabel: { type: String, default: "" },
    read: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/carbon-utils";

.notification {
  margin-bottom: 0;
  margin-right: 0;
}

.action {
  padding-top: 0;
  margin-top: -0.5rem;
}

.action-button {
  color: #78a9ff;
  cursor: pointer;
}

.notification-text {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.notification-caption {
  margin-bottom: 0.5rem;
}

.cv-notifiation.bx--toast-notification.notification {
  width: 25vw;
  min-width: 20rem;
}

.notification-drawer .cv-notifiation.bx--toast-notification.notification {
  width: 100%;
  cursor: pointer;
}

.notification-drawer
  .cv-notifiation.bx--toast-notification.notification.notification-read {
  border-color: $ui-04;
  background-color: #555555;
}

.notification-drawer
  .cv-notifiation.bx--toast-notification.notification.notification-read
  .bx--toast-notification__title {
  font-weight: normal;
}
</style>
