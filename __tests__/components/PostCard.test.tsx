import { render, screen } from '@testing-library/react'
import PostCard from '@/app/components/post/PostCard'
import { Post } from '@/app/types'

const mockPost: Post = {
  id: '1',
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'This is a test post excerpt',
  coverImage: null,
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  readTime: 5,
  authorId: '1',
  author: {
    id: '1',
    name: 'Test Author',
    username: 'testauthor',
    image: null,
  },
  tags: ['test', 'example'],
  _count: {
    likes: 10,
    comments: 5,
  },
}

describe('PostCard', () => {
  it('renders post title', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Test Post')).toBeInTheDocument()
  })

  it('renders post excerpt', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('This is a test post excerpt')).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('Test Author')).toBeTruthy()
  })

  it('renders tags', () => {
    render(<PostCard post={mockPost} />)
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('example')).toBeInTheDocument()
  })
})

