const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1980,
    viewportHeight: 1024,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    
    },
  },
});
