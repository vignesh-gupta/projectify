describe("template spec", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it("Home", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000", {
      headers: {
        'Cookie': '__client_uat=0'
      }
    });
    cy.get('.max-w-\\[600px\\]').click();
    cy.get('.bg-gray-900').click();
    /* ==== End Cypress Studio ==== */
  });
});
