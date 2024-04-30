beforeEach(() => {

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('user998Email'));

  cy.wait(2500);

  cy.get('input[type="password"]').type(Cypress.env('userPass'));

  cy.wait(2500);

  cy.get('button[type="submit"]').click();

  cy.wait(2500);

});

describe('US2-2 User shall allow edit their reviews', () => {
  it('User can edit their review', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking?refresh=true"]').click();
    // cy.get('a > .block').click();
    // cy.get('a > .block').click();
    // cy.get('[for=":r8:"]').click();
    // cy.get('#\\:r8\\:').check();
    // cy.get('#comment').click();
    // cy.get('#comment').clear();
    // cy.get('#comment').type('Bad experience');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('a > .block').click();
    cy.get('a > .block').click();
    cy.get('button.block')
      .contains('Edit My Review') 
      .click();
    cy.get('[data-testid="rating-component"]').find('input[value="5"]').click({ force: true });
    cy.get('#comment').clear();
    cy.get('#comment').type('Good');
    /* ==== End Cypress Studio ==== */
  })
})