import React from 'react'
import userLikesService from '../services/userLikes'

const Blog = ({blog}) => (
  <div>
    <span className={"blog-title"}>{blog.title}</span> <span className={"blog-author"}>{blog.author} </span>
  </div>  
)

export default Blog