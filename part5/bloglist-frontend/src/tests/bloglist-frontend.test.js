/* eslint-disable */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('blog component test', () => {
    test('renders content', async () => {
        const currentUser = {
            username: 'mock',
            name: 'Mock'
        }
        const blog = {
            title: 'mock title',
            author: 'mock author',
            url: 'mock url',
            user: {
                username: 'mock',
                name: 'Mock'
            }
        }

        const {container} = render(<Blog blog={blog} currentUser={currentUser}/>)
        //const element = screen.getByText(/\W*(mock title)\W*/)
        const element = screen.getByText('mock title by mock author')
        expect(element).toBeDefined()
        const blogUrl = container.querySelector('#blogUrl')
        expect(blogUrl).not.toBeVisible()
        const blogLikes = container.querySelector('#blogLikes')
        expect(blogLikes).not.toBeVisible()
    }),
    test('render required content after click', () => {

        const currentUser = {
            username: 'mock',
            name: 'Mock'
        }

        const blog = {
            title: 'mock title',
            author: 'mock author',
            url: 'mock url',
            user: {
                username: 'mock',
                name: 'Mock'
            }
        }

        const {container} = render(<Blog blog={blog} currentUser={currentUser}/>)
        
        const button = screen.getByText('view')
        userEvent.click(button)
        
        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
        const blogUrl = container.querySelector('#blogUrl')
        expect(blogUrl).toBeVisible()
        const blogLikes = container.querySelector('#blogLikes')
        expect(blogLikes).toBeVisible()
    })

})