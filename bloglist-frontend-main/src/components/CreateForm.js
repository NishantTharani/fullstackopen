import React, {useState} from "react";

const CreateForm = (props) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreate = async (event) => {
    event.preventDefault()

    await props.createBlog(title, author, url)
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateForm