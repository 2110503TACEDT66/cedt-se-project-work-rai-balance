describe('User story 1 : Test cases', () => {
  it('Case 1 : Logged in user can see point', () => {
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

  it('Case 2 :  Non logged in user cannot see their point', function () {
    cy.visit('/');
    cy.contains('Login').should('exist');
  });

  it('Case 3 : Remove single booking', function () {
    cy.visit("/login");
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('userPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('[href="/coworking"]').click();
    cy.wait(2000);
    cy.get('[href="/coworking/65e2a201ccf74188031ddc3f"] > .h-\\[300px\\] > .h-\\[70\\%\\] > .object-cover').click();
    cy.wait(2000);
    cy.get('a > .block').click();
    cy.wait(2000);
    cy.get('[data-testid="CalendarIcon"]').click();
    cy.get('.MuiIconButton-edgeStart').click()
    cy.wait(1000);
    cy.get('.MuiIconButton-edgeStart').click();
    cy.wait(1000);
    cy.get('[data-timestamp="1721149200000"]').click();
    cy.get('#\\:r2\\:').type('08:00 AM');
    cy.wait(2000);
    cy.get('#\\:r4\\:').type('10:00 AM');
    cy.wait(1000);
    cy.get('.min-h-full > .block').click();
    cy.wait(1000);
    cy.contains('Bartoletti').should('exist');
    cy.wait(1000);
    cy.get('[alt="deletelogo"]').click();
    cy.wait(1000);
    cy.get('.min-h-full > .justify-center > .block').click();
    cy.contains('You have 0 bookings').should('exist');
    cy.wait(3000);
  });

  it('Case 4 : Remove multiple bookings', function () {
    cy.visit("/login");
    cy.wait(2000);
    cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('userPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('[href="/coworking"]').click();
    cy.wait(1000);
    cy.get('[href="/coworking/65e29f14ccf74188031ddc21"] > .h-\\[300px\\] > .h-\\[70\\%\\] > .object-cover').click();
    cy.wait(1000);
    cy.get('a > .block').click();
    cy.get('[data-testid="CalendarIcon"]').click();
    cy.wait(1000);
    cy.get('[data-testid="ArrowRightIcon"]').click();
    cy.wait(1000);
    cy.get('[data-timestamp="1718816400000"]').click();
    cy.wait(1000);
    cy.get('#\\:rq\\:').clear();
    cy.wait(1500);
    cy.get('#\\:rq\\:').type('08:00 AM');
    cy.wait(1500);
    cy.get('#\\:rs\\:').clear();
    cy.wait(1500);
    cy.get('#\\:rs\\:').type('09:00 AM');
    cy.wait(1500);
    cy.get('.min-h-full > .block').click();
    cy.wait(1500);
    cy.get('[href="/coworking"]').click();
    cy.wait(1500);
    cy.get('[href="/coworking/65e2a05cccf74188031ddc29"] > .h-\\[300px\\] > .h-\\[30\\%\\]').click();
    cy.wait(1500);
    cy.get('a > .block').click();
    cy.wait(1500);
    cy.get('[data-testid="CalendarIcon"] > path').click({ force: true });
    cy.wait(1500);
    cy.get('.MuiIconButton-edgeStart').click();
    cy.get('[data-timestamp="1718902800000"]').click();
    cy.wait(1500);
    cy.get('#\\:r11\\:').clear();
    cy.get('#\\:r11\\:').type('09:00 AM');
    cy.wait(1500);
    cy.get('#\\:r13\\:').clear();
    cy.get('#\\:r13\\:').type('10:00 AM');
    cy.wait(1500);
    cy.get('.min-h-full > .block').click();
    cy.wait(2500);
    cy.contains('You have 2 bookings').should('exist');
    cy.wait(2500);
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
  });

  it('Case 5 : Remove passed booking', function () {
    cy.visit('/login');
    cy.get('#email').clear();
    cy.get('#email').type('cypress3@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('123456');
    cy.get(':nth-child(3) > .flex').click();
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking?refresh=true"]').click();
    cy.contains('You have 1 bookings').should('exist');
    cy.contains('Can\'t edit and delete after the start of reservation').should('exist');
  });

  it('Case 6 : Admin ban user whose point is 0', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.wait(2500);
    cy.get('input[type="password"]').type(Cypress.env('adminPass'));
    cy.wait(2500);
    cy.get('button[type="submit"]').click();
    cy.wait(2500);
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(2000);
    cy.get('[href="/allusers"]').click();
    cy.wait(2000);
    cy.get('a > .block').click();
    cy.wait(2000);
    cy.contains('Ban').should('exist');
  })

  it('Case 7 : Admin can ban user whose point is negative', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.wait(2500);
    cy.get('input[type="password"]').type(Cypress.env('adminPass'));
    cy.wait(2500);
    cy.get('button[type="submit"]').click();
    cy.wait(2500);
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(1000);
    cy.get('[href="/allusers"]').click();
    cy.contains('Ban').should('exist');
  })

  it('Case 8 : Admin can not ban user whose point is positive', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.wait(2500);
    cy.get('input[type="password"]').type(Cypress.env('adminPass'));
    cy.wait(2500);
    cy.get('button[type="submit"]').click();
    cy.wait(2500);
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(1000);
    cy.get('[href="/allusers"]').click();
  })

  it('Case 9 : Admin can edit, add point', () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.wait(2000);
    cy.get('input[type="password"]').type(Cypress.env('adminPass'));
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/approval"]').click();
    cy.wait(2000);
    cy.contains('All').should('exist');
    cy.contains('Approve').should('exist');
    cy.contains('Pending').should('exist');
    cy.contains('Disapprove').should('exist');
    cy.wait(2000);
  })

  it('Case 10 : Non admin can not edit, add point', function () {
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
    cy.contains('Approve').should('not.exist');
  });

})
