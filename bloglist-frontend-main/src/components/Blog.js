import React from 'react'
import {deleteBlog, toggleLikeBlog} from "../reducers/blogReducer";
import { useSelector, useDispatch } from 'react-redux'



const Blog = ({blog}) => {


  const deleteBlogFactory = (blogId) => {
    return () => {
      dispatch(deleteBlog(blogId))
    }
  }

  const dispatch = useDispatch()
  return (
    <div>
      <span className={"blog-title"}><a href={"/blogs/" + blog.id}>{blog.title} </a></span>
      <span className={"blog-author"}>{blog.author} </span>
      <button onClick={deleteBlogFactory(blog.id)}>delete?</button>
    </div>
  )
}

export default Blog