describe("Case General Search", () => {
  beforeEach(() => {
    const path = `${Cypress.env(
      "environment"
    )}/credit/case-general-search/TS001.json`;

    cy.fixture(path).as("testData")
      .then(data => {
        // Login
        cy._login(data.user);

        // TODO: Avoid using wait function. Find loader element and wait it disappeared instead.
        cy.wait(10000);

        // Click Search menu to expand sub menus.
        cy.get(
          "p-panelmenu p-panelmenusub > ul > li:nth-of-type(1) > p-panelmenusub > ul > li:nth-of-type(1) > a",
          { timeout: 5000 }
        )
          .first()
          .click();
    
        // Click Case General Search menu.
        cy.get(
          "p-panelmenu > div > div:nth-of-type(1) li:nth-of-type(1) > p-panelmenusub > ul > li:nth-of-type(1) > p-panelmenusub > ul > li:nth-of-type(1) span"
        ).click();
      });
  });

  afterEach(() => {
    // Logout
    cy._logout();
  })

  it("Test searcy by application date", function () {
    
    // Click and type value in the first Application Date field.
    cy.get("div.p-field-calendar-wrapper > div:nth-of-type(1) input")
      .click()
      .type(this.testData.applicationDateStart);

    // Click and type value in the second Application Date field.
    cy.get("div.p-field-calendar-wrapper > div:nth-of-type(2) input")
      .click()
      .type(this.testData.applicationDateEnd);

    // Find Search button and then click it.
    cy.contains("button.p-content-button", "Search").click();

    // Find and click target row with specified case no.
    cy.get("p-table", { timeout: 5000 })
      .find("a")
      .contains(this.testData.caseNo)
      .click();

    // TODO: Avoid using wait function. Find loader element and wait it disappeared instead.
    cy.wait(10000);

    // Find Case No field and check it has right value.
    cy.contains("div.p-field-label", "Case No", { timeout: 10000 })
      .next()
      .should("contain", this.testData.caseNo);
  });

  it("Test search by case no.", function() {

    cy.contains('div.p-field', 'Case No.').find('input').type(this.testData.caseNo);

    cy.contains("button.p-content-button", "Search").click();
  });
});
