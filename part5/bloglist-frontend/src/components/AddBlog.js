import { useState } from 'react'

const AddBlog = ({ blogAdd }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState('') //eslint-disable-line no-unused-vars

  const createBlog = (event) => {
    event.preventDefault()
    blogAdd({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes
    })
  }

  return (
    <form onSubmit={createBlog}>
      <h2>Add a new blog</h2>

      <div>title <input
        type="text"
        value={blogTitle}
        name="title"
        onChange={({ target }) => setBlogTitle(target.value)}
      /></div>

      <div>author <input
        type="text"
        value={blogAuthor}
        name="author"
        onChange={({ target }) => setBlogAuthor(target.value)}
      /></div>

      <div>url <input
        type="text"
        value={blogUrl}
        name="url"
        onChange={({ target }) => setBlogUrl(target.value)}
      /></div>

      <button type="submit">create</button>

    </form>
  )
}

export default AddBlog