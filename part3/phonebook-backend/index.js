require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('person', function(req,res) { return JSON.stringify(req.body)}) //eslint-disable-line no-unused-vars
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.get('/',(request, response) => {
  const disclaimer = 'Nothing to see here. You should check /info or /api/persons'
  response.send(disclaimer)
})

app.get('/info',(request, response) => {
  const date = new Date()
  Person.countDocuments({}).then(result => {
    const info = `Phonebook has info for ${result} people <br><br> ${date}`
    response.send(info)
  })
})

app.get('/api/persons',(request, response) => {

  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id',(request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person){
      response.json(person)
    } else {
      response.status(404).send('Error 404 / No person found').end()
    }
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (result){
        response.status(204).end()
      } else {
        response.status(404).send('Error 404').end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {

  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  Person.findOne({ name: person.name })
    .then(result => {
      if(result){
        return response.status(400).send('The name is already in the phonebook').end()
      }
    })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person,
    { new:true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

