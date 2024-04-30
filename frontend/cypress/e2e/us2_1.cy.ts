beforeEach(() => {

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('user999Email'));

  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('userPass'));

  cy.wait(1000);

  cy.get('button[type="submit"]').click();

  cy.wait(1000);

});

describe('US2-1 User shall allow add a review', () => {
  it('TC-1 : Logged in user can add review', () => {
    // cy.get('[href="/coworking"]').click();

    // cy.get('[href="/coworking/660274cf2e6002e952322da0"] > .h-\\[300px\\] > .h-\\[70\\%\\] > .object-cover').click();

    // cy.get('a > .block').click();

    // cy.get('.h-\\[40\\%\\]').click();

    // cy.get('[href="/mybooking?refresh=true"]').click();

    // cy.get(':nth-child(1) > .justify-end > .ml-5 > div > a > .block').click();

    // cy.wait(2000);

    // cy.get('.h-\\[40\\%\\]').click();

    // cy.get('[href="/mybooking?refresh=true"]').click();

    // cy.get(':nth-child(2) > .justify-end > .ml-5 > div > a > .block').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking?refresh=true"]').click();
    cy.get('a > .block').click();
    cy.get('[for=":r5:"]').click();
    cy.get('#\\:r5\\:').check();
    cy.get('#comment').clear();
    cy.get('#comment').type('เครื่องดื่มสะอาด พื้นที่นั่งสะอาด ไม่มีเสียงเด็กกรี้ด');

    cy.wait(10000);
    /* ==== End Cypress Studio ==== */
  })
})