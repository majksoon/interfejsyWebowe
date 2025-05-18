// cypress/integration/home.spec.js

describe("Strona główna i wyszukiwanie", () => {
  before(() => {
    // 1) Zaloguj usera przez LocalStorage
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

    // 2) Dodaj pierwszą książkę
    cy.visit("/new");
    cy.get('input[placeholder="Tytuł"]').type("React Book");
    cy.get('input[placeholder="Autor"]').type("Jan Kowalski");
    cy.contains("Dodaj książkę").click();
    cy.url().should("include", "/my");

    // 3) Dodaj drugą książkę
    cy.visit("/new");
    cy.get('input[placeholder="Tytuł"]').type("Vue Guide");
    cy.get('input[placeholder="Autor"]').type("Evans");
    cy.contains("Dodaj książkę").click();
    cy.url().should("include", "/my");
  });

  beforeEach(() => {
    // Każdy test zaczyna od strony głównej
    cy.visit("/");
    cy.get(".book-card").should("have.length.at.least", 2);
  });

  it("powinna wyświetlić listę książek", () => {
    cy.get(".book-card").should("have.length.at.least", 2);
  });

  it("filtruje po tytule", () => {
    cy.get('[data-cy="search-input"]').clear().type("React");

    // musi być przynajmniej jedna karta
    cy.get(".book-card")
      .should("have.length.at.least", 1)
      // każda karta zawiera "react" w tekście
      .each(($card) => {
        cy.wrap($card).invoke("text").should("match", /react/i);
      });

    // upewniamy się, że nasza konkretna książka się pojawiła
    cy.contains(".book-card", "React Book").should("be.visible");
  });

  it("filtruje po autorze", () => {
    cy.get('[data-cy="search-input"]').clear().type("Evans");

    cy.get(".book-card")
      .should("have.length.at.least", 1)
      .each(($card) => {
        cy.wrap($card).invoke("text").should("match", /evans/i);
      });

    cy.contains(".book-card", "Vue Guide").should("be.visible");
  });
});
