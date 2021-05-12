import ConfigurationService from "@/mixins/configuration";
import StorageService from "@/mixins/storage";

export default {
  name: "TaskService",
  mixins: [ConfigurationService, StorageService],
  computed: {
    apiUrl() {
      return this.API_SCHEME + this.API_ENDPOINT;
    },
  },
  methods: {
    getClusterTasks() {
      const token = this.getFromStorage("loggedUser")
        ? this.getFromStorage("loggedUser").token
        : "";
      return this.axios.get(this.apiUrl + "/tasks/cluster", {
        headers: {
          Authorization: `Bearer ${token}`, ////
        },
      });
    },
  },
};
