Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/auth/login");

  cy.get("#email").type(email);
  cy.get("#password").type(password);

  cy.get("button").contains("Login").click();
});
