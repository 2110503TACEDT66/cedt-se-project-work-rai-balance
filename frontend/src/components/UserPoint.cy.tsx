import React from 'react'
import UserPoint from './UserPoint'

describe('<UserPoint />', () => {
  it('renders', () => {
    const userPoint = 3;
    const name = 'Test user';
    const email = 'test@gmail.com';
    
    cy.mount(<UserPoint userPoint={userPoint} name={name} email={email} />)
    
    // Use Cypress command to check if the text exists in the document
    cy.contains(`Point : ${userPoint}`).should('exist');
  })
})