import Navbar from "@/components/navbar";

beforeEach(() => {
  
  // Navigate to login page
  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('userEmail'));
  
  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('userPass'));
  
  cy.wait(1000);
  
  cy.get('button[type="submit"]').click();
  
  cy.wait(1000);

  cy.visit('/')

});


describe("Tests", () => {
  it('check single tag click', () => {
    // Navigate to login page
  });
})
