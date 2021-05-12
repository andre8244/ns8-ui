export default {
  name: "UtilService",
  methods: {
    getErrorMessage(error) {
      const errorMessage = "Something went wrong";

      if (!error.response) {
        return errorMessage;
      }

      switch (error.response.status) {
        case 403:
          return "You don't have permission to access this resource";
      }

      return errorMessage;
    },
  },
};
