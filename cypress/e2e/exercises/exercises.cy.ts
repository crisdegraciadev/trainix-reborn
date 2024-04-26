describe("login", () => {
  const deleteExercise = () => {
    cy.get("button[data-cy=exercise-actions]").click();
    cy.get("[role=menuitem]").contains("Delete").click();
    cy.get("[role=alertdialog] button").contains("Delete").click();

    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
  };

  const createExercise = (name: string) => {
    cy.get("input[id=name]").type(name);
    cy.get("input[placeholder='Select muscles']").click();

    cy.get("[role=dialog]").contains("Chest").click({ force: true });
    cy.get("[role=dialog]").contains("Triceps").click();

    cy.get("[role=dialog]").click();

    cy.get("[role=dialog] button[role=combobox]").click();

    cy.get("[role=option]").contains("Easy").click();

    cy.get("button").contains("Save").click();

    cy.contains("Exercise created");
    cy.contains("The exercise has been created.");
  };

  beforeEach(() => {
    cy.login("test@test.com", "123456789");
    cy.get("[href='/exercises']").click();
    cy.location("pathname").should("include", "/exercises");
  });

  it("should display an empty table for displaying exercises", () => {
    cy.get("table").contains("No results.");
  });

  it("should create an exercise", () => {
    cy.get("button").contains("Exercise").click();

    cy.get("[role=dialog]").get("h2").contains("Create Exercise");

    cy.get("input[id=name]").type("Push Up");
    cy.get("input[placeholder='Select muscles']").click();

    cy.get("[role=dialog]").contains("Chest").click({ force: true });
    cy.get("[role=dialog]").contains("Triceps").click();

    cy.get("[role=dialog]").click();

    cy.get("[role=dialog] button[role=combobox]").click();

    cy.get("[role=option]").contains("Easy").click();

    cy.get("button").contains("Save").click();

    cy.contains("Exercise created");
    cy.contains("The exercise has been created.");

    cy.get("tr td").contains("Push Up");
    cy.get("tr td").contains("Easy");
    cy.get("tr td").contains("Chest");

    deleteExercise();
  });

  it("should not create exercise with the same name", () => {
    cy.get("button").contains("Exercise").click();

    createExercise("Push Up");

    cy.get("button").contains("Exercise").click();

    createExercise("Push Up");

    cy.contains("Error creating exercise.");
    cy.contains("There was an unexpected error creating the exericse.");

    cy.get("[role=dialog] button>span").contains("Close").parent("button").click();

    deleteExercise();
  });

  it("should delete an exercise", () => {
    cy.get("button").contains("Exercise").click();

    createExercise("Push Up");

    cy.get("button[data-cy=exercise-actions]").click();
    cy.get("[role=menuitem]").contains("Delete").click();
    cy.get("[role=alertdialog] button").contains("Delete").click();

    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
  });

  it("should edit an exercise", () => {
    cy.get("button").contains("Exercise").click();

    createExercise("Pus Up");

    cy.contains("Exercise created");
    cy.contains("The exercise has been created.");

    cy.get("tr td").contains("Pus Up");

    cy.get("button[data-cy=exercise-actions]").click();
    cy.get("[role=menuitem]").contains("Edit").click();

    cy.get("[role=dialog]").get("h2").contains("Update exercise");

    cy.get("input[id=name]").should("have.value", "Pus Up");
    cy.get("input[id=name]").clear();
    cy.get("input[id=name]").wait(200).type("Push Up");

    cy.get("button").contains("Save").click();

    cy.contains("Exercise updated");
    cy.contains("The exercise has been updated");

    cy.get("tr td").contains("Push Up");

    deleteExercise();
  });
});
