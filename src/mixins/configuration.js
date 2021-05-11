export default {
  name: "ConfigurationService",
  data() {
    return {
      PRODUCT_NAME: "NethServer 8",
      DOCS_URL: "https://www.nethserver.org/documentation/",
      COMPANY_NAME: "Nethesis",
      // API_ENDPOINT: window.location.host + window.location.pathname + "api", ////
      API_ENDPOINT: window.location.hostname + ":8081/api",
      API_SCHEME: window.location.protocol + "//",
    };
  },
};
