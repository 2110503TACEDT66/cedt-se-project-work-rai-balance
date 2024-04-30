beforeEach(() => {

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('adminEmail'));

  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('adminPass'));

  cy.wait(1000);

  cy.get('button[type="submit"]').click();

  cy.wait(1000);

});

describe('US1-4 Admin reduce user point as a punish when user leave a bad review', () => {
  it('Test admin disapprove review', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/approval"]').click();
    cy.get(':nth-child(3) > a > .text-xl').click();
    cy.get('[href="/approval/editDisapprove/662fdddccfde41f5cc0dc949?id=662fdddccfde41f5cc0dc949&name=ksmdkldfslkdfsmklfmfskmfdklmgsklfofd"] > .m-auto').click();
    cy.get('.min-h-full > .justify-center > .block').click();
    /* ==== End Cypress Studio ==== */
  })
})