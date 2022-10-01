const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose')
var morgan = require('morgan')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
// const url = process.env.MONGODB_URL

// const Person = mongoose.model('Person', personSchema)

//get  all persons from DB
app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
    console.log(person)
  })

})
// mongoose.connect(url).then(result => console.log('connected to DB'))
// mongoose.connection.close()
// get info


app.get('/info', (req, res) => {
  const date = Date()
  Person.estimatedDocumentCount()
    .then(result => {
      res.write(`<h1>Phonebook has info for ${result} people</h1>`)
      res.write(`<p>${date}`)
    })
})
//get single person
app.get('/api/persons/:id/', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

// add person
app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => next(error))
})
// update person

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  if (!req.body.number) {
    return res.status(400).send({ error: 'number is not sent in the request' })
  }
  if (req.body.number.length < 8) {
    return res.status(400).send({ error: 'number is not sent in the request' })
  }
  Person.findByIdAndUpdate(req.params.id, { name, number },
    {
      runValidators: true,
      context: 'query',
      new: true,
    })
    .then(person => {
      if (person) {
        return res.status(200).send(person)
      } else {
        return res.status(404).send({ error: 'Person to update does not exist' })
      }
    })
    .catch(error => next(error))
})


// delete person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})
// catch requests made to non-existant routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// catch malformatted IDs
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})