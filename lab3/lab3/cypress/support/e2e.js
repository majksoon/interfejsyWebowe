Cypress.on("uncaught:exception", (err) =>
  err.message.includes("Hydration failed") ? false : true
);
