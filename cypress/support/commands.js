// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("_login", (userNo) => {
  cy.visit("/login");
  cy.get("#userAccount").click();
  cy.get("#userAccount").type(userNo);
  cy.get("sigv-login span").click();
});

Cypress.Commands.add("_logout", () => {
  cy.get("div:nth-of-type(2) img").click();
  cy.get("sigv-header div.ng-trigger span").click();
});

//等待Loading
Cypress.Commands.add("_waitForLoading", () => {
  cy.get("div.swagger-ui").then($container => {
    if ($container.find('div.loading-container').length>0) {
      cy.wait(1500);
      //cy.log('wait again')
      cy._waitForLoading();
    } else {
      //cy.log('wait finish')
    }
  })
});