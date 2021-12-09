// import { getGreeting } from '../support/app.po';

describe('fullstack-webclient', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');
    // expect(1).toBe(1);
    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome to fullstack-webclient!');
  });
});
