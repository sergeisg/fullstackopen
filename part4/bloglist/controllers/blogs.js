const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
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

module.exports = blogsRouter