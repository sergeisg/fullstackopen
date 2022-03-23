const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => { //eslint-disable-line no-unused-vars
    console.log('connected')
  })
  .catch((error) => {
    console.log('error', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: ((value) => {
        const regex1 =/^[0-9]{2}-?[0-9]{6,}$/
        const regex2=/^[0-9]{3}-?[0-9]{5,}$/
        return regex1.test(value) || regex2.test(value)
      }),
      message: 'Number must have 8 digits or more | Formats supported: 09-678956 / 546-96731 / 65789034'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

