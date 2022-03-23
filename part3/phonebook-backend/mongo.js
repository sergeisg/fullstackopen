const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('Make sure you are not missing anything >> node mongo.js <password>')
    process.exit()
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = 
`mongodb+srv://sgadmin:${password}@cluster0.lxgfy.mongodb.net/phonebookDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String, 
    number: Number, 
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: personName,
    number: personNumber
})

if (process.argv.length === 3){
    console.log('phonebook:')
    Person
    .find({})
    .then(persons=>{
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
            mongoose.connection.close()
        })
} else if (process.argv.length === 5) {   
    person.save().then(result =>{
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Type node mongo.js <password> to display the phonebook content or add a new contact >> node mongo.js <password> <name> <number>')
    process.exit()
}
    


    



    
    

    
        
    
    
    
    
    
    
    