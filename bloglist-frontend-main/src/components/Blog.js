import React from 'react'
import {deleteBlog, toggleLikeBlog} from "../reducers/blogReducer";
import { useSelector, useDispatch } from 'react-redux'



const Blog = ({blog}) => {
  const toggleLikeFactory = (blogId) => {
    return () => {
      dispatch(toggleLikeBlog(blogId))
    }
  }

  const deleteBlogFactory = (blogId) => {
    return () => {
      dispatch(deleteBlog(blogId))
    }
  }

  const dispatch = useDispatch()
  return (
    <div>
      <span className={"blog-title"}>{blog.title} </span>
      <span className={"blog-author"}>{blog.author} </span>
      <button onClick={toggleLikeFactory(blog.id)}>{blog.liked ? "unlike" : "like"}</button>
      <button onClick={deleteBlogFactory(blog.id)}>delete?</button>
    </div>
  )
}

export default Blog