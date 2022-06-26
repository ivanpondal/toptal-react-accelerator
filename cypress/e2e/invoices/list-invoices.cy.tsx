describe("/invoices", () => {
  const EXISTING_USER_EMAIL = "fake_user5@officehourtesting.com";
  const EXISTING_USER_PASSWORD = "123456";

  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:3000/login");

    cy.get('[data-test="email"]').should("be.visible");
    cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
    cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
    cy.get('[data-test="submit-login"]').click();

    cy.location("pathname").should("eq", "/");
  });

  it("can navigate to all invoices by clicking button on dashboard", () => {
    cy.get(`[data-test='view-all-invoices']`).should("be.visible").click();
    cy.location("pathname").should("eq", "/invoices");

    cy.get(`[data-test="invoice-number"]`).should("be.visible");
    cy.get(`[data-test="invoice-companyName"]`).should("be.visible");
    cy.get(`[data-test="invoice-creationDate"]`).should("be.visible");
    cy.get(`[data-test="invoice-dueDate"]`).should("be.visible");
    cy.get(`[data-test="invoice-project"]`).should("be.visible");
    cy.get(`[data-test="invoice-total"]`).should("be.visible");
  });

  it("can sort by company name", () => {
    cy.get(`[data-test='view-all-invoices']`).should("be.visible").click();

    // wait until no longer in dashboard
    cy.get(`[data-test='view-all-clients']`).should("not.exist");
    cy.location("pathname").should("eq", "/invoices");

    // sort by company, asc
    cy.get('[data-test="company-name-header"]').should("be.visible").click();
    cy.location("search").should("eq", "?sortBy=companyName&sortOrder=ASC");
    cy.get(
      `[data-test="invoice-row-ap23"]:first [data-test="invoice-companyName"]`
    ).contains("Apple");

    // sort by company, desc
    cy.get('[data-test="company-name-header"]').should("be.visible").click();
    cy.location("search").should("eq", "?sortBy=companyName&sortOrder=DESC");
    cy.get(
      `[data-test="invoice-row-ms1"]:first [data-test="invoice-companyName"]`
    ).contains("Microsoft");
  });
});
