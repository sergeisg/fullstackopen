const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const { application } = require('express')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialNotes){
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialNotes.length)
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
    expect(response.body).toHaveLength(helper.initialNotes.length + 1)
    
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('mock title')
})