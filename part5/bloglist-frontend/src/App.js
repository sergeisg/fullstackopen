import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('logged user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('logged user', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const blogList = () => (
    <div>
      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>Add a new blog</h2>

      <div>title <input
      type="text"
      value={blogTitle}
      name="title"
      onChange={({target}) => setBlogTitle(target.value)}
      /></div>

      <div>author <input
      type="text"
      value={blogAuthor}
      name="author"
      onChange={({target}) => setBlogAuthor(target.value)}
      /></div>

      <div>url <input
      type="text"
      value={blogUrl}
      name="url"
      onChange={({target}) => setBlogUrl(target.value)}
      /></div>

      <button type="submit">save blog</button>

    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    blogService.setToken(user.token)
    blogService.create(newBlog).then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
  }
  
  return (
    <div>
      <h1>Blogs</h1>

      {user === null 
      ? loginForm()
      : <div>
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleClick}>logout</button>
        {blogForm()}
        {blogList()}
        </div>}
    </div>
  )
}

export default App