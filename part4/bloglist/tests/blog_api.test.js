const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
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