const listHelper = require('../utils/list_helper')
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when there is no blogs', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('when there is only one blog', () => {
        expect(totalLikes([{likes: 1}])).toBe(1)
    })

    test('when there are several blogs', () => {
        const blogs = [
            {likes: 1},
            {likes: 3},
            {likes: 4}
        ]
        expect(totalLikes(blogs)).toBe(8)
    })

    describe('favorite blog', () => {

        const singleBlog = [{likes: 9}]
        const blogs = [
            {likes:9},
            {likes:8},
            {likes:10}
        ]

        test('when there is no blogs', () => {
            expect(favoriteBlog([])).toEqual({})
        })

        test('when there is only one blog', () => {
            expect(favoriteBlog(singleBlog)).toEqual({likes: 9})
        })

        test('when there are several blogs', () => {
            expect(favoriteBlog(blogs)).toEqual({likes:10})
        })
    })
})