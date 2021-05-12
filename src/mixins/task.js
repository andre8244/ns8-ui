import StorageService from "@/mixins/storage";

export default {
  name: "TaskService",
  mixins: [StorageService],
  computed: {
    apiUrl() {
      return this.$root.config.API_SCHEME + this.$root.config.API_ENDPOINT;
    },
  },
  methods: {
    getClusterTasks() {
      const token = this.getFromStorage("loggedUser")
        ? this.getFromStorage("loggedUser").token
        : "";
      return this.axios.get(this.apiUrl + "/tasks/cluster", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
};
