beforeEach(() => {

});

describe('US1-4 Admin reduce user point as a punish when user leave a bad review', () => {
  it('TC-1 : Admin can edit, add point', () => {
    cy.visit("/login");

    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));

    cy.wait(1000);

    cy.get('input[type="password"]').type(Cypress.env('adminPass'));

    cy.wait(1000);

    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.get('.h-\\[40\\%\\]').click();

    cy.get('[href="/approval"]').click();

    cy.wait(2000);

  })

  it('TC-2 : Non admin can not edit, add point', function () {
    cy.visit('/login')
    cy.get('#email').clear();
    cy.wait(1000);
    cy.get('#email').type('cypress@gmail.com');
    cy.get('#password').clear();
    cy.wait(1000);
    cy.get('#password').type('123456');
    cy.wait(1000);
    cy.get(':nth-child(3) > .flex').click();

    cy.visit('/approval')
    cy.wait(1000);
    cy.contains('Approval').should('not.exist');
  });
})