describe("Dodawanie nowej książki", () => {
  before(() => {
    cy.visit("/");
    cy.window().then((win) => {
      win.localStorage.setItem(
        "firebase:authUser:AIzaSyBZxgEQd-PKYuIaRqiZJBLP1t-vBcEREjE:[DEFAULT]",
        JSON.stringify({
          uid: "test-uid",
          displayName: "Cypress Tester",
          email: "test@cypress.io",
        })
      );
    });
  });

  it("po zalogowaniu pozwala dodać książkę", () => {
    cy.visit("/new");
    cy.get('input[placeholder="Tytuł"]').type("Cypress E2E");
    cy.get('input[placeholder="Autor"]').type("Cypress Test");
    cy.contains("Dodaj książkę").click();
    cy.url().should("include", "/my");
    cy.contains("Cypress E2E").should("exist");
  });
});
