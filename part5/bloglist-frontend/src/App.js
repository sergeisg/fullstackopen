import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogLikes, setBlogLikes] = useState('')
  const [blogUser, setBlogUser] = useState({})
  const [blogUrl, setBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [messageStyle, setMessageStyle] = useState(true)
  const [addBlogVisible, setAddBlogVisible ] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>{
        const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
    })  
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
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('logged user', JSON.stringify(user))
      setErrorMessage(`${username} logged in`)
      setMessageStyle(true)
      setTimeout(() => {setErrorMessage(null)}, 3500)
    } catch (exception) {
      console.log('in catch')
      setErrorMessage('Wrong user or password')
      setMessageStyle(false)
      setTimeout(() => {setErrorMessage(null)}, 3500)
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    setErrorMessage(`${user.username} logged out`)
    setMessageStyle(false)
    setTimeout(() => {setErrorMessage(null)}, 3500)
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => { 
    return (
      <LoginForm 
        loginHandle={handleLogin}
        userName={username}
        passWord={password}
        setUserName={setUsername}
        setPassWord={setPassword}
      />
    )}
    
  const blogList = () => (
    <div>
      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogList={blogs} setBlogs={setBlogs}/>
      )}
    </div>
  )

  const blogForm = () => {

      const hideWhenVisible = { display: addBlogVisible ? 'none' : ''}
      const showWhenVisible = { display: addBlogVisible ? '' : 'none'}

  return (
    <div>

    <div style={hideWhenVisible}>
      <button onClick={(() => setAddBlogVisible(true))}>new blog</button>
    </div>

    <div style={showWhenVisible}>
    <AddBlog 
    blogAdd={addBlog}
    titleBlog={blogTitle}
    authorBlog={blogAuthor}
    urlBlog={blogUrl}
    setTitleBlog={setBlogTitle}
    setAuthorBlog={setBlogAuthor}
    setUrlBlog={setBlogUrl}
    />
    <button onClick={(() => setAddBlogVisible(false))}>cancel</button>
    </div>

    </div>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes,
      user: blogUser
    }
    console.log(newBlog)
    blogService.setToken(user.token)
    blogService.create(newBlog).then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
    setErrorMessage(`New blog ${newBlog.title} by ${newBlog.author} created`)
    setMessageStyle(true)
    setTimeout(() => {setErrorMessage(null)}, 3500)
  }
  
  return (
    <div>
      <h1>Blogs</h1>

      {errorMessage === null ? '' : <Notification notification={errorMessage} displayStyle={messageStyle} />}

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