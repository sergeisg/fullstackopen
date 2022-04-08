import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
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

  /*const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
      value={newBlog}
      onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )*/

  const blogList = () => (
    <div>
      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>

      {user === null 
      ? loginForm()
      : <div>
        <p>{user.name} logged in</p>
        {blogList()}
        </div>}
    </div>
  )
}

export default App