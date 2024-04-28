describe("exercises", () => {
  const deleteExercise = () => {
    cy.get("button[data-cy=exercise-actions]").first().click();
    cy.get("[role=menuitem]").contains("Delete").click();
    cy.get("[role=alertdialog] button").contains("Delete").click();
  };

  const createExercise = (name: string, muscles: string[], difficulty: string) => {
    cy.get("button").contains("Exercise").click();

    cy.get("[role=dialog]").should("exist");
    cy.get("[role=dialog] h2").contains("Create Exercise").should("exist");

    cy.get("input[id=name]").type(name);

    cy.get("input[placeholder='Select muscles']").click();
    muscles.forEach((muscle) => {
      cy.get("[role=dialog]").contains(muscle).click();
    });

    cy.get("[role=dialog]").click();

    cy.get("[role=dialog] button[role=combobox]").click();

    cy.get("[role=option]").contains(difficulty).click();

    cy.get("button").contains("Save").click();
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
    createExercise("Push Up", ["Chest", "Triceps"], "Easy");
    createExercise("Push Up", ["Chest", "Triceps"], "Easy");

    cy.contains("Error creating exercise.");
    cy.contains("There was an unexpected error creating the exericse.");

    cy.get("[role=dialog] button>span").contains("Close").parent("button").click();

    deleteExercise();
  });

  it("should delete an exercise", () => {
    createExercise("Push Up", ["Chest", "Triceps"], "Easy");

    cy.get("button[data-cy=exercise-actions]").click();
    cy.get("[role=menuitem]").contains("Delete").click();
    cy.get("[role=alertdialog] button").contains("Delete").click();

    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
  });

  it("should edit an exercise", () => {
    createExercise("Pus Up", ["Chest", "Triceps"], "Easy");

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

  it("should filter by name", () => {
    createExercise("Push Up", ["Chest", "Triceps"], "Easy");
    createExercise("Squat", ["Quadriceps"], "Easy");

    cy.get("tr td").contains("Squat");
    cy.get("tr td").contains("Push Up");

    cy.get("input[placeholder='Filter name...']").type("Squat");

    cy.get("tr td").contains("Squat");
    cy.get("tr td").contains("Push Up").should("not.exist");

    cy.get("input[placeholder='Filter name...']").clear();

    cy.get("tr td").contains("Squat");
    cy.get("tr td").contains("Push Up");

    deleteExercise();
    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
    cy.get("[data-cy=loading-table]").should("not.exist");

    deleteExercise();
    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
    cy.get("[data-cy=loading-table]").should("not.exist");
  });

  it("should filter by muscles", () => {
    createExercise("Push Up", ["Chest", "Triceps"], "Easy");
    createExercise("Squat", ["Quadriceps"], "Easy");

    cy.get("tr td").contains("Squat");
    cy.get("tr td").contains("Push Up");

    cy.get("button[data-cy='Muscles-filter']").click();

    cy.get("input[placeholder='Muscles']").type("Chest");
    cy.get(".lucide-check").parent().click();

    cy.get("tr td").contains("Push Up");
    cy.get("tr td").contains("Squat").should("not.exist");

    cy.get("input[placeholder='Muscles']").clear();

    cy.get("input[placeholder='Muscles']").type("Triceps");
    cy.get(".lucide-check").parent().click();

    cy.get("tr td").contains("Push Up");
    cy.get("tr td").contains("Squat").should("not.exist");

    deleteExercise();
    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
    cy.get("[data-cy=loading-table]").should("not.exist");

    deleteExercise();
    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
    cy.get("[data-cy=loading-table]").should("not.exist");
  });

  it("should filter by difficulty", () => {
    createExercise("Push Up", ["Chest", "Triceps"], "Easy");
    createExercise("Squat", ["Quadriceps"], "Medium");

    cy.get("tr td").contains("Squat");
    cy.get("tr td").contains("Push Up");

    cy.get("button[data-cy='Difficulties-filter']").click();

    cy.get("input[placeholder='Difficulties']").type("Easy");
    cy.get(".lucide-check").parent().click();

    cy.get("tr td").contains("Push Up");
    cy.get("tr td").contains("Squat").should("not.exist");

    cy.get("input[placeholder='Difficulties']").clear();

    cy.get("input[placeholder='Difficulties']").type("Medium");
    cy.get(".lucide-check").parent().click();

    cy.get("tr td").contains("Push Up");
    cy.get("tr td").contains("Squat");

    deleteExercise();
    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
    cy.get("[data-cy=loading-table]").should("not.exist");

    deleteExercise();
    cy.contains("Exercise deleted");
    cy.contains("The exercise has been deleted.");
    cy.get("[data-cy=loading-table]").should("not.exist");
  });
});
