const _ = require("lodash")
const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}
const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.length === 0
        ? 0
        :
        array.reduce(reducer, 0) / array.length
}

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.length === 0
        ? 0
        :
        blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}
const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((acc, curr) => (acc.likes > curr.likes ? acc : curr))
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    // return author who has the largest amount of blogs
    // 1. make strings comparable 
    // 2. count how many times X author has written a blog
    // 3. map to the author who has done the most
    let popular = _.chain(blogs)
        .groupBy('author')
        .map((element, author) => {
            return { author: author, blogs: element.length }
        })
        .maxBy((number) => number.blogs)
        .value()
    return popular
}

const popularAuthor = (blogs) => {
    let mostLikes = _.chain(blogs)
        .groupBy('author')
        .map((element, author) => {
            return {
                author: author,
                likes: element.reduce((acc, current) => {
                    return (acc += current.likes)
                }, 0),
            }
        })
        .maxBy((number) => number.likes)
        .value()
    return mostLikes
}

module.exports = {
    reverse,
    average,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    popularAuthor
}