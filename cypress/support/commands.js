// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createCustomer', (firstName, lastName, postCode) => {
    cy.get('button').contains('Bank Manager Login').click()
    cy.get('button').contains('Add Customer').click()
    cy.get('input[placeholder="First Name"]').clear().type(firstName)
    cy.get('input[placeholder="Last Name"]').clear().type(lastName)
    cy.get('input[placeholder="Post Code"]').clear().type(postCode)
    cy.get('button[type="submit"]').click()
    cy.contains('Home').click()

})

Cypress.Commands.add('openAccount', (fullName, currency) => {
    cy.get('button').contains('Bank Manager Login').click()
    cy.get('button').contains('Open Account').click()
    cy.get('select[id="userSelect"]').select(fullName)
    cy.get('select[id="currency"]').select(currency)
    cy.get('button[type="submit"]').click()
    cy.get('.home').click()
})

Cypress.Commands.add('login', (fullName) => {
    cy.get('button').contains('Customer Login').click()
    cy.get('select[id="userSelect"]').select(fullName)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('searchCustomer', (name) => {
    cy.get('button').contains('Bank Manager Login').click()
    cy.get('button').contains('Customers').click()
    cy.get('input[placeholder="Search Customer"]').clear().type(name)
})

Cypress.Commands.add('depositAnAmount', (amount) => {
    cy.get('button').contains('Deposit').click()
    cy.get('input[placeholder="amount"]').type(amount)
    cy.get('button[type="submit"]').click()
    cy.wait(1000)

})


Cypress.Commands.add('withdrawlAnAmount', (amount) => {
    cy.get('button').contains('Withdrawl').click()
    cy.get('input[placeholder="amount"]').type(amount)
    cy.get('button[type="submit"]').click()
    cy.wait(1000)

})

Cypress.Commands.add('clearTransactions', () => {
    cy.get('button').contains('Reset').click()
})

Cypress.Commands.add('verify', (message) => {
    cy.get('.error').invoke('text').should('eq', message)

})

Cypress.Commands.add('verifyTransaction', (amount, transactionType) => {
    cy.get('button').contains('Transactions').click()
    cy.get('tr').contains(amount).should('exist')
    cy.get('tr').contains(transactionType).should('exist')
})

Cypress.Commands.add('home', () => {
    cy.get('.home').click()
})