import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import BlogModal from '../sections/components/blog-modal'
import Button from 'react-bootstrap/Button'

export default function Blog(props) {

  const [data, setData] = useState(props.data)
  const [isLoading, setLoading] = useState(false)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
      setLoading(true)
      fetch('https://koleeum-admin.herokuapp.com/posts')
      .then((res) => res.json())
      .then((posts) => {
          setPosts(posts)
          setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!posts) return <p>No posts!</p>

  return (
    <div className="blog-page">
      <Head>
        <title>{data.SEO.meta_title}</title>
        <meta name="description" content={data.SEO.meta_description} />
        <meta name="robots" content={data.SEO.indexation ? "index, follow" : "noindex, nofollow"} />
      </Head>
      <div className="blog fadeIn">
        <Container>
          <Row>
            <Col xs={12} className="title-container">
              <h1 className="title">{data.title}</h1>
              <p className="description">{data.description}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="cards">
                <Container>
                  <Row>
                    { posts.map(function(post) {
                      return ( 
                        <Col key={post.title} xs={12} sm={6} md={4}>
                          <div className="card">
                            <div className="card-thumbnail">
                              <img src={post.image.url} />
                            </div>
                            <div className="card-txt">
                              <h3 className="card-title">{post.title}</h3>
                              <div className="card-description">{post.description}</div>
                              <BlogModal post={post} />
                            </div>
                          </div> 
                        </Col>
                      )
                    })}
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://koleeum-admin.herokuapp.com/blog')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}