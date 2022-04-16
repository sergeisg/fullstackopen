const AddBlog = ({
  titleBlog,
  setTitleBlog,
  authorBlog,
  setAuthorBlog,
  urlBlog,
  setUrlBlog,
  blogAdd
}) => {
  return (
    <form onSubmit={blogAdd}>
      <h2>Add a new blog</h2>

      <div>title <input
        type="text"
        value={titleBlog}
        name="title"
        onChange={({ target }) => setTitleBlog(target.value)}
      /></div>

      <div>author <input
        type="text"
        value={authorBlog}
        name="author"
        onChange={({ target }) => setAuthorBlog(target.value)}
      /></div>

      <div>url <input
        type="text"
        value={urlBlog}
        name="url"
        onChange={({ target }) => setUrlBlog(target.value)}
      /></div>

      <button type="submit">create</button>

    </form>
  )
}

export default AddBlog