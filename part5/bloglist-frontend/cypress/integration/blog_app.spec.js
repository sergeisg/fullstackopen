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

        it('a blog can be liked', function(){
            cy.get('.blog').contains('cypress test by cypress test').contains('view').click().then(() => {
                cy.get('.togglableContent').contains('0').get('#likeButton').click().then(() => {
                    cy.get('.togglableContent').contains('1')
                })
            })
        })

        it('a blog can be deleted', function(){
            cy.visit('http://localhost:3000')
            cy.get('#username').type('mock')
            cy.get('#password').type('mock')
            cy.get('#login-button').click()
            cy.get('.blog').contains('cypress test by cypress test').contains('view').click().then(() => {
                cy.get('.togglableContent').get('#remove-button').click()
            })
            cy.get('html').should('not.contain','cypress test by cypress test')
        })

        it('blogs are ordered according to likes', function(){

            cy.get('#new-blog-button').click()

            cy.newBlog({title:'mock test', author:'mock test', url:'mock test'}).then(() => {
                cy.get('.blog').contains('mock test by mock test').get('#view-button').click().then(() => {
                    cy.get('.togglableContent').contains('like').click()
            })
            
            cy.newBlog({title:'cypress test', author:'cypress test', url:'cypress test'}).then(() => {
                cy.wait(1000).get('.blog').contains('cypress test by cypress test').contains('view').click()
                cy.get('.blog').first().contains('mock test by mock test')
                cy.get('.blog').contains('cypress test by cypress test').contains('like').click().click() 
            })
            
            cy.wait(3000).get('.blog').first().contains('cypress test by cypress test')

            })
        })
    })
  })

 