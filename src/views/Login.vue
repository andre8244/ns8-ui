<template>
  <div>
    <div class="bx--grid bx--grid--full-width login-bg">
      <div class="bx--row">
        <div class="bx--offset-md-1 bx--col-md-6 bx--offset-lg-4 bx--col-lg-8">
          <div class="test">
            <cv-tile :light="true" class="login-tile">
              <h2 class="login-title">Log in</h2>
              <div v-if="step === 'username'">
                <cv-form @submit.prevent="checkUsername" class="login-form">
                  <cv-text-input
                    label="Username"
                    v-model="username"
                    class="mg-bottom-md"
                    placeholder="Your username"
                    :invalid-message="error.username"
                    ref="usernameInput"
                  ></cv-text-input>
                  <cv-checkbox
                    label="Remember username"
                    class="mg-bottom-md"
                    v-model="rememberUsername"
                    value="checkRememberUsername"
                  />
                  <div class="login-footer">
                    <cv-button
                      kind="primary"
                      :icon="ArrowRight20"
                      class="login-button"
                      >Continue</cv-button
                    >
                  </div>
                </cv-form>
              </div>
              <div v-else-if="step === 'password'">
                Logging in as {{ username }}
                <cv-link @click="goToUsername">Not you?</cv-link>
                <cv-form @submit.prevent="checkPassword" class="login-form">
                  <cv-text-input
                    label="Password"
                    type="password"
                    v-model="password"
                    class="bx--password-input mg-bottom-md"
                    placeholder="Your password"
                    :invalid-message="error.password"
                    password-hide-label="Hide password"
                    password-show-label="Show password"
                    ref="passwordInput"
                  ></cv-text-input>
                  <div class="login-footer">
                    <cv-button
                      kind="primary"
                      :icon="ArrowRight20"
                      class="login-button"
                      >Log in</cv-button
                    >
                  </div>
                </cv-form>
              </div>
            </cv-tile>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconService from "@/mixins/icon";

export default {
  name: "Login",
  mixins: [IconService],
  data() {
    return {
      username: "",
      password: "",
      rememberUsername: false,
      step: "username",
      error: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.focusUsername();
  },
  methods: {
    checkUsername() {
      this.error.username = "";

      if (!this.username.trim()) {
        this.error.username = "Username is required";
        this.focusUsername();
      } else {
        this.step = "password";
        this.focusPassword();
      }
    },
    checkPassword() {
      this.error.password = "";

      if (!this.password.trim()) {
        this.error.password = "Password is required";
        this.focusPassword();
      } else {
        console.log("login"); ////
      }
    },
    goToUsername() {
      this.step = "username";
      this.password = "";
      this.focusUsername();
    },
    focusUsername() {
      // focus on username field
      this.$nextTick(() => {
        const usernameInput = this.$refs.usernameInput;
        usernameInput.focus();
      });
    },
    focusPassword() {
      // focus on password field
      this.$nextTick(() => {
        const passwordInput = this.$refs.passwordInput;
        passwordInput.focus();
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/carbon-utils";

.login-bg {
  height: calc(100vh - 3rem);
  background-color: $interactive-02;
}

.login-tile {
  margin-top: $spacing-13;
  padding-bottom: 0;
}

.login-title {
  margin-bottom: $spacing-03;
}

.login-form {
  margin-top: $spacing-07;
}

.login-footer {
  display: flex;
  height: 4rem;
  justify-content: flex-end;
}

.login-button {
  width: 50%;
  height: 100%;
  margin-right: -1rem;
}
</style>
