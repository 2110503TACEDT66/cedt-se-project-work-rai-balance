beforeEach(() => {

  cy.visit("/login");

  cy.wait(1000);

  cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));

  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('userPass'));

  cy.wait(1000);

  cy.get('button[type="submit"]').click();

  cy.wait(1000);

});

describe('User shall remove their booking if it\'s not due yet.', () => {
  it('TC-1 : Remove single booking', function () {
    cy.get('[href="/coworking"]').click();

    cy.wait(1000);

    cy.get('[href="/coworking/65e2a201ccf74188031ddc3f"] > .h-\\[300px\\] > .h-\\[70\\%\\] > .object-cover').click();

    cy.wait(1000);

    cy.get('a > .block').click();

    cy.get('[data-testid="CalendarIcon"]').click();
    // cy.get('[test-cy="datepick"]').click();
    cy.get('.MuiIconButton-edgeStart').click();
    cy.get('.MuiIconButton-edgeStart').click();
    cy.get('[data-timestamp="1718125200000"]').click();

    cy.get('#\\:r2\\:').type('08:00 AM');
    cy.get('#\\:r4\\:').type('10:00 AM');

    cy.wait(1000);

    /* ==== Generated with Cypress Studio ==== */

    cy.get('.min-h-full > .block').click();

    cy.wait(1000);
    // cy.get('.h-\\[40\\%\\]').click();
    // cy.get('[href="/mybooking"]').click();

    /* ==== End Cypress Studio ==== */

    cy.contains('Bartoletti').should('exist');
    
    cy.wait(1000);
    
    /* ==== Generated with Cypress Studio ==== */
    
    cy.get('[alt="deletelogo"]').click();

    cy.wait(1000);

    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.min-h-full > .justify-center > .block').click();

    cy.wait(1000);

    cy.contains('You have 0 bookings').should('exist');

    cy.wait(3000);
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('TC-2 : Remove multiple bookings', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="/coworking"]').click();
    cy.wait(1000);
    cy.get('[href="/coworking/65e29f14ccf74188031ddc21"] > .h-\\[300px\\] > .h-\\[70\\%\\] > .object-cover').click();
    cy.wait(1000);
    cy.get('a > .block').click();
    cy.get('[data-testid="CalendarIcon"]').click();
    cy.get('[data-testid="ArrowRightIcon"]').click();
    cy.get('[data-timestamp="1716483600000"]').click();
    cy.get('#\\:rk\\:').clear();
    cy.get('#\\:rk\\:').type('08:00 AM');
    cy.wait(1000);
    cy.get('#\\:rm\\:').clear();
    cy.get('#\\:rm\\:').type('09:00 AM');
    cy.wait(1000);
    cy.get('.min-h-full > .block').click();
    cy.wait(2000);
    cy.get('[href="/coworking"]').click();
    cy.wait(2000);
    cy.get('[href="/coworking/65e2a05cccf74188031ddc29"] > .h-\\[300px\\] > .h-\\[30\\%\\]').click();
    cy.wait(1000);
    cy.get('a > .block').click();
    cy.wait(1000);
    cy.get('[data-testid="CalendarIcon"]').click();
    cy.get('[data-testid="ArrowRightIcon"]').click();
    cy.get('[data-timestamp="1716397200000"]').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#\\:r11\\:').clear();
    cy.get('#\\:r11\\:').type('09:00 AM');
    cy.get('#\\:r13\\:').clear();
    cy.get('#\\:r13\\:').type('11:00 AM');
    cy.get('.min-h-full > .block').click();

    cy.wait(2500);
    cy.contains('You have 2 bookings').should('exist');
    cy.wait(2500);
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[alt="deletelogo"]').click({ multiple: true });
    cy.wait(1500);
    cy.get('.min-h-full > .justify-center > .block').click();
    cy.wait(1500);
    cy.get('[alt="deletelogo"]').click({ multiple: true });
    cy.wait(1500);
    cy.get('.min-h-full > .justify-center > .block').click();
    cy.wait(1500);
    cy.contains('You have 0 bookings').should('exist');
    cy.wait(2500);
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('TC 3 : Remove passed booking', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('.absolute > [href="/"]').click();
    cy.get('[href="/login"]').click();
    cy.get('#email').clear();
    cy.get('#email').type('cypress3@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('123456');
    cy.get(':nth-child(3) > .flex').click();
    // cy.get('[href="/mybooking"]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking?refresh=true"]').click();
    cy.get('[href="/mybooking/delete/663097e83c3f554c1579f3b2"] > .w-\\[20px\\]').click();
    cy.get('.min-h-full > .justify-center > .block').click();
    cy.contains('You have 1 bookings').should('exist');
    cy.wait(2500);
    cy.get('[alt="deletelogo"]').click();
    cy.get('.min-h-full > .justify-center > .block').click();
    cy.wait(2500);
    cy.contains('You have 1 bookings').should('exist');
    cy.wait(2500);
    /* ==== End Cypress Studio ==== */
  });
})