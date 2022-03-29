
describe('xwy bank testing', () => {

    beforeEach( () => {
        cy.visit('/')
    })

    it('should login customer when customer has open an account', () => {
        cy.home()
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.openAccount('asmae imazzi', 'Dollar')

        cy.login('asmae imazzi')

        cy.get('select').should('not.be.empty')

    });

    it('should not login customer when customer has not open an account', () => {
        cy.home()
        cy.createCustomer("asmae", "imazzi", 1234)

        cy.login('asmae imazzi')

        cy.get('[ng-show="noAccount"]').invoke('text').should('eq', 'Please open an account with us.')
    });

    it('should add deposit when amount is positive', () => {
        cy.home()
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.openAccount('asmae imazzi', 'Dollar')
        cy.login('asmae imazzi')

        cy.depositAnAmount(12334)

        cy.verify('Deposit Successful')
        cy.verifyTransaction(12334,'Credit')
        cy.clearTransactions()
    });

    it('should not add deposit when amount is negative', () => {
        cy.home()
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.openAccount('asmae imazzi', 'Dollar')
        cy.login('asmae imazzi')

        cy.depositAnAmount(-12334)
    });

    it('should withdraw an amount when balance greater than withdrawl', () => {
        cy.home()
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.openAccount('asmae imazzi', 'Dollar')
        cy.login('asmae imazzi')
        cy.depositAnAmount(12334)

        cy.withdrawlAnAmount(123)

        cy.verify('Transaction successful')
        cy.verifyTransaction(12334,'Debit')
        cy.clearTransactions()
    });

    it('should withdraw an amount when balance lower than withdrawl', () => {
        cy.home()
        cy.createCustomer("asmae", "imazzi", 1234)
        cy.openAccount('asmae imazzi', 'Dollar')
        cy.login('asmae imazzi')
        cy.depositAnAmount(123)

        cy.withdrawlAnAmount(1234)

        cy.verify('Transaction Failed. You can not withdraw amount more than the balance.')

    });

})