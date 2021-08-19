import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    let blogObj = {
      'title': 'some title',
      'author': 'some author',
      'url': 'some url'
    }
    component = render(
      <Blog blog={blogObj} />
    )
  })

  test('title is displayed', () => {
    expect(component.container).toHaveTextContent('some title')
  })

  test('author is displayed', () => {
    expect(component.container.querySelector('.blog-author')).toBeDefined()
  })

})