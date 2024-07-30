// cypress.config.js
module.exports = {
  e2e: {
    baseUrl: "https://api-homologacao.getnet.com.br/",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
};
