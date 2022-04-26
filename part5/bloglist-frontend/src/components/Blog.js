import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogList, setBlogs, currentUser, likeHandler }) => {

  const [showDetails, setShowDetails] = useState(false)
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisibility = (event) => {
    event.preventDefault()
    showDetails ? setShowDetails(false) : setShowDetails(true)
  }

  /*const handleLikes = async (event) => {
    event.preventDefault()
    const blogs = await blogList
    const newLikes = blog.likes +=1
    const updatedBlog = await blogService.update(blog.id, newLikes)
    setBlogs(blogs.map(x => x.id === blog.id ? updatedBlog : x))
    const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }*/

  const removeBlog = async (event) => {
    event.preventDefault()
    const blogs = await blogList
    blogService.setToken(currentUser.token)

    if(confirm(`Deleting ${blog.title} by ${blog.author}`)){
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(x => x.id !== blog.id))
    } else {
      return
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} by {blog.author} <button onClick={handleVisibility}>{showDetails ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className='togglableContent'>
        <p id="blogUrl">{blog.url}</p>
        <p id="blogLikes">Likes {blog.likes} <button id="likeButton" onClick={likeHandler}>like</button></p>
        <p>{blog.user.name}</p>
        {currentUser.username === blog.user.username ? <button onClick={removeBlog}>remove</button> : ''}
      </div>
    </div>
  )}

export default Blog