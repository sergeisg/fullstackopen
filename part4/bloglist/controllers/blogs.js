const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})


blogsRouter.get('/mostlikes', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(listHelper.mostLikes(blogs))  
})

blogsRouter.get('/mostblogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(listHelper.mostBlogs(blogs))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author, 
        url: body.url, 
        likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = 
        await Blog.findByIdAndUpdate(request.params.id, blog, { new:true, runValidators: true, context: 'query'})
    response.json(updatedBlog)
})

module.exports = blogsRouter