describe('Trivia App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.fixture('question-data').then(( data ) => {
      cy.intercept('https://opentdb.com/api.php?difficulty=easy&amount=1', {
        statusCode: 200,
        body: data
      })
  })
  })
  describe('New game form', () => {
    beforeEach(() => {
      cy.fixture('categories').then(( data ) => {
        cy.intercept('https://opentdb.com/api_category.php', {
          statusCode: 200,
          body: data
        })
      })
    })
    
    it('should show a user a form to start a new game on load', () => {
      cy.get('main').find('.new-game')
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

    it('should allow a user to filter by answer type', () => {
      cy.get('.new-game').get('label[for="boolean"]').click()
    })

    it('should allow a user to start a game with those filters', () => {
      cy.get('.new-game').get('select[name="difficulty"]').select('Easy').should('have.value', 'Easy')
      cy.get('.new-game').get('input[name="amount"]').type(1).should('have.value', 1)
      cy.get('.new-game').find('button').click()
      cy.get('.in-game')
    })
  })

  describe('LobbyScoreBoard', () => {

    it('should have a section to show previous games', () => {
      cy.get('.new-game').get('select[name="difficulty"]').select('Easy').should('have.value', 'Easy')
      cy.get('.new-game').get('input[name="amount"]').type(1).should('have.value', 1)
      cy.get('.new-game').find('button').click()
      cy.get('.option').first().click()
      cy.get('button').contains('Submit').click()
      cy.get('.end-slide').find('a').click()
      cy.visit('http://localhost:3000')
      cy.get('.lobby').find('.lobby-score').contains('Entertainment: Film 0/1')
    })

    it('should allow a user to clear their game history', () => {
      cy.get('button').contains('Clear History').click()
      cy.get('.lobby').find('.lobby-score').contains('Entertainment: Film 0/1').should('not.exist')
    })
  })

  describe('In Game', () => {
    beforeEach(() => {
      cy.get('.new-game').get('select[name="difficulty"]').select('Easy').should('have.value', 'Easy')
      cy.get('.new-game').get('input[name="amount"]').type(1).should('have.value', 1)
      cy.get('.new-game').find('button').click()
      cy.get('.in-game')
    })

    it('should allow a user to select an answer for a question', () => {
      cy.get('.option').first().click()
      cy.get('button').contains('Submit').click()
      cy.get('.in-game').find('.end-slide')
    })

    it('should allow a user to return to lobby after answering a question', () => {
      cy.get('.option').first().click()
      cy.get('button').contains('Submit').click()
      cy.get('.end-slide').find('a').click()
      cy.get('.lobby')
    })

    it('should allow a user to return to play another round after finishing', () => {
      cy.get('.option').first().click()
      cy.get('button').contains('Submit').click()
      cy.get('.end-slide').find('button').click()
      cy.get('.in-game')
    })

    it('should allow a user to see their score if they get the question right', () => {
      cy.get('.option').last().click()
      cy.get('button').contains('Submit').click()
      cy.get('.score-board').contains('Current Round: 1/1')
    })

    it('should allow a user to see their score if they get the question wrong', () => {
      cy.get('.option').first().click()
      cy.get('button').contains('Submit').click()
      cy.get('.score-board').contains('Current Round: 0/1')
    })

    it('should allow a user to see their incorrect questions in the event they answer incorrectly', () => {
      cy.get('.option').first().click()
      cy.get('button').contains('Submit').click()
      cy.get('button').contains('Play another Round').click()
      cy.get('button').contains('incorrect').click()
      cy.get('.score-board').contains('Who directed the movies')
    })
  })
})