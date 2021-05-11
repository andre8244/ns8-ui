import ConfigurationService from "@/mixins/configuration";

export default {
  name: "LoginService",
  mixins: [ConfigurationService],
  computed: {
    apiUrl() {
      return this.API_SCHEME + this.API_ENDPOINT;
    },
  },
  methods: {
    login(username, password) {
      return this.axios.post(this.apiUrl + "/login", { username, password });
    },
  },
};
