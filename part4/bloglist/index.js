const config = require('./utils/config')
const logger = require('./utils/logger')
const http = require('http')
const app = require('./app')
const Blog = require('./models/blog')
const listHelper = require('./utils/list_helper')

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.get('/api/blogs/most', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(listHelper.mostBlogs(blogs))
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})