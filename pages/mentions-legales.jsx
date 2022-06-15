import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import RegistrationForm from '../sections/components/registration-form'

export default function Legal(props) {

  const [data, setData] = useState(props.data)

  return (
    <div className="legal-page">
        <Head>
          <title>{data.SEO.meta_title}</title>
          <meta name="description" content={data.SEO.meta_description} />
          <meta name="robots" content={data.SEO.indexation ? "index, follow" : "noindex, nofollow"} />
        </Head>
        <div className="legal fadeIn">
            <div className="container">
                <Row>
                    <Col xs={12} sm={8} md={6}>
                        <h1 className="title">{data.title}</h1>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="text-content">{data.content}</Markdown>
                    </Col>
                </Row>    
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://koleeum-admin.herokuapp.com/legal')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}