import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import RegistrationForm from '../sections/components/registration-form'
import LogementsList from '../sections/list-logements'

export default function Offres(props) {

  const [data, setData] = useState(props.data)

  return (
    <div className="offres-page">
        <Head>
            <title>{data.SEO.meta_title}</title>
            <meta name="description" content={data.SEO.meta_description} />
            <meta name="robots" content={data.SEO.indexation ? "index, follow" : "noindex, nofollow"} />
        </Head>
        <div className="offres fadeIn">
            <Container className="title-container">
                <Row className="justify-content-center">
                    <Col xs="12" sm={10} md={8}>
                        <h1 className="title">{data.title}</h1>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.description}</Markdown>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <LogementsList />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className="registration">
                            <div className="container">
                                <h2 className="title">{data.registration.title}</h2>
                                <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.registration.description}</Markdown>
                                <RegistrationForm />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://koleeum-admin.herokuapp.com/offres')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}
