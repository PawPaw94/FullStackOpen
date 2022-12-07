const Blog = require('../models/blog')


const initialBlogs = [
    {
      title: 'HTML is easy',
      author: 'dada',
      url: 'www.google.com',
      likes: 10,
    },
    {
      title: 'Browser can execute only Javascript',
      author: 'nobody',
      url: 'www.google.com',
      likes: 1,
    },
  ]

const nonExistingId = async() => {
    const blog = new Blog({ title:'willremovethissoon', likes:23})
    await blog.save()
    await blog.remove()
    
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}