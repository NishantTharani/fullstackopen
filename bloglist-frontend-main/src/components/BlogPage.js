import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  useParams
} from "react-router-dom"

import blogService from "../services/blogs"
import userLikesService from "../services/userLikes"
import {initBlogs, toggleLikeBlog} from "../reducers/blogReducer";

const BlogPage = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  const toggleLikeFactory = (blogId) => {
    return () => {
      setBlogLikes(blog.liked ? blogLikes - 1 : blogLikes + 1)
      dispatch(toggleLikeBlog(blogId))
    }
  }

  const getBlogLikes = async () => {
    const likes = await userLikesService.getLikesOfBlog(id)
    setBlogLikes(likes)
  }

  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs.filter(blogObj => blogObj.id === id))[0]
  const [blogLikes, setBlogLikes] = useState(0)

  useEffect(() => {
    dispatch(initBlogs())
    getBlogLikes()
  }, [user])

  useEffect(() => {
  }, [blog])

  return (
    <div>
      {blog === undefined ?
        <p></p>
        :
        <div>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <p>{blogLikes} likes - <button onClick={toggleLikeFactory(id)}>{blog.liked ? "unlike" : "like"}</button></p>
          <p>added by {blog.author}</p>
        </div>
      }
    </div>
  )
}


export default BlogPage