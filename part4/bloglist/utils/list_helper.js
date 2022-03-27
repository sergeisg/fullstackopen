const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else if (blogs.length === 1) {
        return {...blogs[0]}
    } else {
        const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
        return {title: favorite.title, author: favorite.author, likes: favorite.likes}
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        const authorHashMap = blogs
            .map(blog => blog.author)
            .reduce((author, val) => {
                author[val] = (author[val] || 0) + 1
                return author
            }, {})
        
        const blogCount = Math.max(...Object.values(authorHashMap))
        const blogAuthor = Object.keys(authorHashMap).filter(val => authorHashMap[val] === blogCount)
        return { author: blogAuthor[0], blogs: blogCount }
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }