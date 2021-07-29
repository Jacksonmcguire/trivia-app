describe('Trivia App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  describe('Host Game', () => {
    beforeEach(() => {
      cy.get('input[placeholder="name"]').type('Jackson')
      cy.get('button').contains('Host').click()
    })
    it('should allow a user to create a name for the game', () => {
      cy.get('input[placeholder="Room Name"]').type('game 1').should('have.value', 'game 1')
    })
    it('should allow a user to filter by difficulty', () => {
      cy.get('.new-game').get('select[name="difficulty"]').select('Easy').should('have.value', 'Easy')
    })

    it('should allow a user to filter by category', () => {
      cy.get('.new-game').get('select[name="category"]').select('General Knowledge').should('have.value', 9)
    })

    it('should allow a user to filter by number of questions', () => {
      cy.get('.new-game').get('input[name="amount"]').type(1).should('have.value', 1)
    })

    it('should allow a user to host a game with those filters', () => {
      cy.get('button').contains("Let's Play").click()
    })
  })
  describe('Play Game', () => {
    beforeEach(() => {
      cy.get('input[placeholder="name"]').type('Jackson')
      cy.get('button').contains('Join').click()
    })
    it('should allow a user to enter a room to join', () => {
      cy.get('input[placeholder="Room"]').type('game 1').should('have.value', 'game 1')
      cy.get('button').contains('Join').click()
    })
    it('should bring up the chat when you join a room', () => {
      cy.get('input[placeholder="Room"]').type('game 1').should('have.value', 'game 1')
      cy.get('button').contains('Join').click()
      cy.get('.render-chat').should('exist')
    })
  })
})