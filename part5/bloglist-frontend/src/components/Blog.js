import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogList, setBlogs}) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleVisibility = (event) => {
    event.preventDefault()
    showDetails ? setShowDetails(false) : setShowDetails(true)
  }

  const handleLikes = async (event) => {
    event.preventDefault()
    const newLikes = blog.likes +=1
    const blogs = await blogList
    blogService.update(blog.id, newLikes).then(updatedBlog => {
      setBlogs(blogs.map(x => x.id === blog.id ? updatedBlog : x))
    })
  }
  
  return (
  <div style={blogStyle}>
    {blog.title} by {blog.author} <button onClick={handleVisibility}>{showDetails ? 'hide' : 'view'}</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>Likes {blog.likes} <button onClick={handleLikes}>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  </div>  
)}

export default Blog