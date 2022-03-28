const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const { application } = require('express')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs){
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the blog post identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body){
        expect(blog).not.toHaveProperty('_id')
        expect(blog.id).toBeDefined()
    }
})

test('the POST request successfully creates a new blog post', async () => {
    const newBlogPost = {
        title: "mock title",
        author: "mock author",
        url: "mock url",
        likes: 5
    }

    await api  
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const contents = response.body.map(r => r.title)
    expect(contents).toContain('mock title')
})

test('when the blog post lacks the likes property, it defaults to zero', async () => {
    const newBlogPost = {
        title: "mock title",
        author: "mock author",
        url: "mock url"
    }

    await api  
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    const contents = response.body.map(r => r.likes)
    expect(contents).toContain(0)
})

test('not providing a title and a url causes a 400 error', async() => {
    const newBlogPost = {
        author: "mock author",
        likes: 5
    }

    await api  
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(400)
})

test('deleting a specific blog post', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).not.toContain(blogToDelete.title)
})

test('updating a specific blog post', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlogPost = { likes: 74 }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlogPost)
        .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
    const updatedBlog = await api
        .get(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)
    
    expect(updatedBlog.body.likes).toBe(74)
})