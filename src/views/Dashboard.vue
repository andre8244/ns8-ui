<template>
  <div class="bx--grid bx--grid--full-width">
    <div class="bx--row">
      <div class="bx--col-lg-16">full width column</div>
    </div>
    <div class="bx--row">
      <div class="bx--col-md-4 bx--col-lg-7">7/16</div>
      <div class="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">8/16</div>
    </div>
    <div class="bx--row">
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
    </div>
    <div class="bx--row">
      <div class="bx--col-md-4">
        <div>
          <cv-icon-button
            kind="secondary"
            :icon="Flash16"
            label="Button label"
            tip-position="bottom"
            tip-alignment="center"
          />
        </div>

        <cv-button :icon="Flash16"> Button with icon </cv-button>

        <cv-code-snippet :light="true">{{ snippet }}</cv-code-snippet>

        <cv-date-picker kind="single" value="01/01/2020"></cv-date-picker>

        <cv-tag kind="blue" label="I am a tag"></cv-tag>

        <cv-tile
          kind="selectable"
          aria-label="custom aria label"
          :light="true"
          value="check-1"
        >
          <h1>Hello</h1>
          <p>This is some tile content</p>
        </cv-tile>

        <cv-toggle value="check-1"> </cv-toggle>

        <cv-interactive-tooltip alignment="center" direction="right">
          <template v-if="true" slot="label"> Tooltip label </template>
          <template v-if="true" slot="trigger"
            ><Filter16
              class="bx--overflow-menu__icon bx--toolbar-filter-icon"
            />
          </template>
          <template v-if="true" slot="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <button class="bx--button">Clicky one</button>
          </template>
        </cv-interactive-tooltip>

        <cv-toast-notification
          v-if="toastVisible"
          kind="info"
          :title="toastTitle"
          :sub-title="toastSubTitle"
          :caption="toastCaption"
          @close="closeToast"
          :low-contrast="lowContrast"
        ></cv-toast-notification>
        <!-- <cv-toast-notification
          v-if="toastVisible"
          kind="warning"
          :title="toastTitle"
          :sub-title="toastSubTitle"
          :caption="toastCaption"
          @close="closeToast"
          :low-contrast="lowContrast"
        ></cv-toast-notification>
        <cv-toast-notification
          v-if="toastVisible"
          kind="error"
          :title="toastTitle"
          :sub-title="toastSubTitle"
          :caption="toastCaption"
          @close="closeToast"
          :low-contrast="lowContrast"
        ></cv-toast-notification>
        <cv-toast-notification
          v-if="toastVisible"
          kind="success"
          :title="toastTitle"
          :sub-title="toastSubTitle"
          :caption="toastCaption"
          @close="closeToast"
          :low-contrast="lowContrast"
        ></cv-toast-notification> -->

        <AreaChart />
      </div>
    </div>
  </div>
</template>

<script>
import AreaChart from "@/components/AreaChart";
import Flash16 from "@carbon/icons-vue/es/flash/16";
import Filter16 from "@carbon/icons-vue/es/filter/16";

export default {
  name: "Dashboard",
  components: { AreaChart, Filter16 },
  data() {
    return {
      toastVisible: true,
      toastTitle: "Toast title",
      toastSubTitle: "Toast subtitle",
      toastCaption: "Toast caption",
      lowContrast: false,
      snippet: 'printf("A short bit of code.");',
      Flash16, //// use mixin
    };
  },
  methods: {
    closeToast() {
      console.log("closeToast"); ////
    },
  },
};
</script>
