const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
}
)

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (!body.title) {
        return response.status(400).json({
          error: 'Missing title'
        })
      } else if (!body.author) {
        return response.status(400).json({
          error: 'Missing author'
        })
      } else if (!body.url) {
        return response.status(400).json({
          error: 'Missing url'
        })
      } else if (!body.likes) {
        body.likes = 0
      }
    const blog = new Blog({
        title: body.title || false,
        author: body.author || false,
        url: body.url || false,
        likes: body.likes || false
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(200).json(blogUpdated)
})

module.exports = blogsRouter