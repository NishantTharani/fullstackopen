import React from 'react'
const Blog = ({blog}) => (
  <div>
    <span className={"blog-title"}>{blog.title}</span> <span className={"blog-author"}>{blog.author} </span>
  </div>  
)

export default Blog