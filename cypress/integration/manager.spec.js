
describe('manager testing', () => {

    it('successfully loads', () => {
        cy.visit('/')
    })

    it('should add customer when all fields are filled', () => {
        cy.createCustomer("asmae", "imazzi", 1234)

        cy.searchCustomer("imazzi")
        cy.get('td').contains('asmae').should('exist')
        cy.home()
    });

    it('should not add new customer when duplicate', () => {
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.createCustomer("asmae", "imazzi", 1234)

        cy.searchCustomer("imazzi")
        cy.get('tr').eq(1).contains('asmae imazzi').should('exist')
        cy.get('tr').eq(2).should('not.exist')
        cy.home()
    });

    it('should not add customer when all fields are not filled', () => {
        cy.get('button').contains('Bank Manager Login').click()
        cy.get('button').contains('Add Customer').click()

        cy.get('button[type="submit"]').click()

        cy.get('input:invalid').invoke('prop', 'validationMessage').should('equal', 'Veuillez compléter ce champ.')
        cy.home()
    });

    it('should open account', () => {
        cy.createCustomer("asmae", "imazzi", 1234)
        
        cy.openAccount('asmae imazzi', 'Dollar')

        cy.login('asmae imazzi')
        cy.get('select').should('not.be.empty')
        cy.home()
    });

    it('should search a customer when typing an existing name', () => {
        cy.createCustomer("asmae", "imazzi", 1234)

        cy.searchCustomer("imazzi")

        cy.get('tr').eq(1).contains('asmae imazzi')
        cy.home()
    });

    it('should not find a customer when name does not exist', () => {
        cy.searchCustomer("aaaa")

        cy.get('tr').eq(1).should('not.exist')
        cy.home()
    });

    it('should delete customer when customer exist', () => {
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.searchCustomer("imazzi")

        cy.get('button[ng-click="deleteCust(cust)"]').click()

        cy.get('tr').contains('asmae').should('not.exist')
        cy.home()
    });


    it('should delete first customer when have more than customer with same name', () => {
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.createCustomer("asmae", "imazzi", 123)
        cy.searchCustomer("imazzi")

        cy.get('button[ng-click="deleteCust(cust)"]').first().click()

        cy.get('tr').contains(1234).should('not.exist')
        cy.get('tr').contains(123).should('exist')
        cy.home()
    });



})