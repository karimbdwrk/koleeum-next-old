import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import RegistrationForm from '../sections/components/registration-form'

export default function Investisseurs(props) {

  const [data, setData] = useState(props.data)

  return (
    <div className="proprietaires-page">
      <Head>
        <title>{data.SEO.meta_title}</title>
        <meta name="description" content={data.SEO.meta_description} />
        <meta name="robots" content={data.SEO.indexation ? "index, follow" : "noindex, nofollow"} />
      </Head>
      <div className="proprietaires fadeIn">
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
                    <Col xs={12}>
                        <div className="sections">
                            <Container>
                                <Row key={data.first_section.id} className="section first-section justify-content-center">
                                    <Col xs={12} sm={4}>
                                        <div className="image">
                                            <Image
                                                src={data.first_section.image.url}
                                                alt="Hero illustration"
                                                width={550}
                                                height={550}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={5}>
                                        <div className="txt-content">
                                            <h2 className="title">{data.first_section.title}</h2>
                                            <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.first_section.description}</Markdown>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="cards">
                                    {data.first_section.cards.map((card) =>
                                        <Col xs={12} sm={4} key={card.id}>
                                            <div className="card">
                                                <div className="icon">
                                                    <img src={card.icon.url} />
                                                </div>
                                                <div className="txt-content">
                                                    <h2 className="title">{card.title}</h2>
                                                    <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{card.description}</Markdown>
                                                </div>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </Container>
                            <Container>
                                {data.page_section.map((section) =>
                                    <Row key={section.id} className="section justify-content-center">
                                        <Col xs={12} sm={4}>
                                            <div className="image">
                                                <img src={section.image.url} />
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={5}>
                                            <div className="txt-content">
                                                <h2 className="title">{section.title}</h2>
                                                <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{section.description}</Markdown>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="garanties">
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8}>
                        <h2 className="title">{data.garanties.title}</h2>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.garanties.description}</Markdown>
                        <Container>
                            <Row className="logos justify-content-center">
                                {data.garanties.logos.map((logo) =>
                                    <Col xs={6} sm={4} md={3} key={logo.id} className="logo">
                                        <img src={logo.image.url} />
                                    </Col>
                                )}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container className="sections">
                <Row key={data.last_section.id} className="section justify-content-center">
                    <Col xs={12} sm={4}>
                        <div className="image">
                            <img src={data.last_section.image.url} />
                        </div>
                    </Col>
                    <Col xs={12} sm={5}>
                        <div className="txt-content">
                            <h2 className="title">{data.last_section.title}</h2>
                            <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.last_section.description}</Markdown>
                        </div>
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
  const res = await fetch('https://koleeum-admin.herokuapp.com/proprietaires')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}
