import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import RegistrationForm from '../sections/components/registration-form'

export default function Rgpd(props) {

  const [data, setData] = useState(props.data)

  return (
    <div className="rgpd-page">
        <Head>
            <title>Koleeum.immo</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="rgpd fadeIn">
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
  const res = await fetch('https://koleeum-admin.herokuapp.com/rgpd')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}