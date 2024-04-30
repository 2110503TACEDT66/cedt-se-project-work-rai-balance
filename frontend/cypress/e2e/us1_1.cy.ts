beforeEach(() => {

  cy.visit('/');

});

describe('US1-1 : User can see their current points.', () => {
  it('TC : 1 Logged in user can see their point.', () => {

    cy.visit("/login");

    cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));

    cy.wait(2000);

    cy.get('input[type="password"]').type(Cypress.env('userPass'));

    cy.wait(2000);

    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    cy.get('.h-\\[40\\%\\]').click();
    
    cy.get('[href="/pointHistory/66306babe91195858a52cb21"]').click();

    cy.contains('Point : 2').should('exist');
    
  })
  

  it('TC : 2 Non logged in user cannot see their point', function () {

    cy.visit('/');
    
    cy.contains('Login').should('exist');

  });
})