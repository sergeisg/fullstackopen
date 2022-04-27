/*eslint-disable*/

describe('Blog app', function() {
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {name:'Mocky Mock', username: 'mock', password: 'mock'}
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })
  })

  describe('Login', function() {
    beforeEach(function(){
        cy.get('button').then(($body) => {
            if($body.text().includes('logout')){
                cy.get('#logout-button').click()
            }
        })
        cy.get('#username').clear()
        cy.get('#password').clear()
    })
    it('succeeds with correct credentials', function() {
        cy.get('#username').type('mock')
        cy.get('#password').type('mock')
        cy.get('#login-button').click()
        cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('mocky')
        cy.get('#password').type('mocky')
        cy.get('#login-button').click()
        cy.get('.red').contains('Wrong user or password')
    })

    describe ('When logged in', function(){
        beforeEach(function(){
            cy.get('#username').type('mock')
            cy.get('#password').type('mock')
            cy.get('#login-button').click()
        })
    it('a blog can be created', function(){
        cy.get('#new-blog-button').click()
        cy.get('#title').type('cypress test')
        cy.get('#author').type('cypress test')
        cy.get('#url').type('cypress test')
        cy.get('#create-blog').click()
        cy.contains('cypress test')
    })
    })
  })

 