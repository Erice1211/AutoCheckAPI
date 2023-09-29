const { defineConfig } = require("cypress");
const setupNodeEvents = require("./cypress/plugins/index.js");

module.exports = defineConfig({
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/report",
      reportPageTitle: "Cypress Test Report",
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents,
  },
});
