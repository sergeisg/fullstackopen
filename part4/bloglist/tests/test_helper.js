const Blog = require('../models/blog')

const initialNotes = [
    {
        title:"Blog 1",
        author: "Arthur Mitchell",
        url:"https://www.trinity.com",
        likes:"5"
    },
    {
        title:"Blog 2",
        author: "Dexter Morgan",
        url:"https://www.ritamemorial.com",
        likes:"7"
    },
    {
        title:"Blog 3",
        author: "Arthur Mitchell",
        url:"https://www.trinity.com",
        likes:"1"
    }
]

module.exports = { initialNotes }