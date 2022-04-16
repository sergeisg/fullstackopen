import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogList, setBlogs, currentUser}) => {

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

  const handleLikes = async (event) => {
    event.preventDefault()
    const newLikes = blog.likes +=1
    const blogs = await blogList
    const updatedBlog = await blogService.update(blog.id, newLikes)
    setBlogs(blogs.map(x => x.id === blog.id ? updatedBlog : x))
    const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

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
  <div style={blogStyle}>
    {blog.title} by {blog.author} <button onClick={handleVisibility}>{showDetails ? 'hide' : 'view'}</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>Likes {blog.likes} <button onClick={handleLikes}>like</button></p>
      <p>{blog.user.name}</p>
      {currentUser.username === blog.user.username ? <button onClick={removeBlog}>remove</button> : ''}
    </div>
  </div>  
)}

export default Blog