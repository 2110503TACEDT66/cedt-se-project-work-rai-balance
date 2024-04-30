describe('User story 2 : Test cases', () => {
  it('Case 1 : Logged in user can create a review', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('user999Email'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('userPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking?refresh=true"]').click();
    cy.get('a > .block').click();
    cy.get('[for=":r5:"]').click();
    cy.get('#\\:r5\\:').check();
    cy.get('#comment').clear();
    cy.get('#comment').type('เครื่องดื่มสะอาด พื้นที่นั่งสะอาด ไม่มีเสียงเด็กกรี้ด');
    cy.contains('Submit').should('exist');
    cy.wait(2000);
  })

  it('Case 2 : Non logged in user can not create a review', () => {
    cy.visit('/mybooking');
    cy.wait(2000);
    cy.contains('You have 0 bookings').should('not.exist');
  })

  it('Case 3 : Logged in user can create a review with empty review message', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('user1000Email'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('userPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking?refresh=true"]').click();
    cy.get('a > .block').click();
    cy.get('[for=":r5:"]').click();
    cy.get('#\\:r5\\:').check();
    cy.get('#comment').clear();
    cy.contains('Submit').should('exist');
    cy.wait(2000);
  })

  it('Case 4 : Logged in user can not create a review with empty review message and null rating', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('user1001Email'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('userPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking?refresh=true"]').click();
    cy.get('a > .block').click();
    cy.get('#comment').clear();
    cy.contains('Submit').should('exist');
    cy.wait(2000);
  })

  it('Case 5, 6 : User can not see all user reviews, Can not approve/disapprove reviews', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('userPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.visit('/approval');
    cy.contains('Approve').should('not.exist');
    cy.contains('Disapprove').should('not.exist');
    cy.contains('Not authorized').should('exist');
  })

  it('Case 7, 8 : Admin can see all user reviews, Can approve/disapprove reviews', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('adminPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(2000);
    cy.get('[href="/approval"]').click();
    cy.contains('Approve').should('exist');
    cy.contains('Disapprove').should('exist');
  })

  it('Case 9 : Admin can disapprove approved review', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('adminPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(2000);
    cy.get('[href="/approval"]').click();
    cy.contains('Approve').should('exist');
    cy.contains('Disapprove').should('exist');
  })

  it('Case 10 : Logged in user can not disapprove approved review', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('userPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.visit('/approval');
    cy.contains('Approve').should('not.exist');
    cy.contains('Disapprove').should('not.exist');
    cy.contains('Not authorized').should('exist');
  })

})