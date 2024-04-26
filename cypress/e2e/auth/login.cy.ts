describe("login", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
  });

  it("should navigate to login page", () => {
    cy.location("pathname").should("include", "/auth/login");
  });

  it("should display errors in form to fill username and password", () => {
    cy.get("button").contains("Login").click();

    cy.contains("The provided email is invalid");
    cy.contains("Password should be at least 8 characters");
  });

  it("should display an error dialog with invalid format", () => {
    cy.get("#email").type("test@test");
    cy.get("#password").type("test");

    cy.get("button").contains("Login").click();

    cy.contains("The provided email is invalid");
    cy.contains("Password should be at least 8 characters");
  });

  it("should display a toast error with invalid credentials", () => {
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("12332112331");

    cy.get("button").contains("Login").click();

    cy.contains("Incorrect credentials");
    cy.contains("The provided credentials are not correct");
  });

  it("should login and navigate", () => {
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("123456789");

    cy.get("button").contains("Login").click();

    cy.location("pathname").should("include", "/workouts");
  });
});
