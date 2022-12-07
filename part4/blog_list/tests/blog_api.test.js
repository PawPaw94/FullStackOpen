const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
describe('When there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs/')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'Browser can execute only Javascript'
    )
  })
})

describe('viewing a specific blog', () => {
  test('a specific note can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const newBlog = {
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

      const BlogsAtEnd = await helper.blogsInDb()

      expect(BlogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'somebody',
      url: 'www.soundslikeacoolquote.fi',
      likes: 12
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('blog with invalid data will not be added', async () => {
    const newBlog = {
      likes: 13
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a note', () => {
  test('a blog can be deleted, status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})
  // test('blogs are defined by id', async () => {
  //   const response = await api.get('/api/blogs/')

  //   expect(response.body[0].id).toBeDefined()
  // })


  // test('if likes are undefined, set to zero', async () => {
  //   const newBlogWithNoLikes = {
  //     title: 'likes undefined',
  //     author: 'equals',
  //     url: 'zero likes',
  //   }
  //   await api
  //     .post('/api/blogs')
  //     .send(newBlogWithNoLikes)
  //     .expect(201)
  //     .expect('Content-Type', /application\/json/)

  //   let response = await api.get('/api/blogs')
  //   expect(response.body.length).toEqual(3)

  //   response = await api.get(`/api/blogs/${response.body[2].id}`)
  //   expect(response.body.likes).toEqual(0)
  // })

  // test('test if title is missing', async () => {
  //   const noAuthor = {
  //     author: 'equals',
  //     url: 'zero likes',
  //     likes: 10
  //   }
  //   await api
  //     .post('/api/blogs')
  //     .send(noAuthor)
  //     .expect('Content-Type', /application\/json/)
  //     .expect(400)
  // })

  // test('test if URL is missing', async () => {
  //   const noURL = {
  //     title: 'heya!',
  //     author: 'equals',
  //     likes: 10
  //   }

  //   await api
  //     .post('/api/blogs')
  //     .send(noURL)
  //     .expect('Content-Type', /application\/json/)
  //     .expect(400)
  // })


  afterAll(() => {
    mongoose.connection.close()
  })