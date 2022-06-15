import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import RegistrationForm from '../sections/components/registration-form'

export default function Occupants(props) {

  const [data, setData] = useState(props.data)

  return (
    <div className="locataires-page">
      <Head>
        <title>{data.SEO.meta_title}</title>
        <meta name="description" content={data.SEO.meta_description} />
        <meta name="robots" content={data.SEO.indexation ? "index, follow" : "noindex, nofollow"} />
      </Head>
      <div className="locataires fadeIn">
          <Container className="title-container">
                <Row className="justify-content-center">
                    <Col xs="12" sm={10} md={8}>
                        <h1 className="title">{data.title}</h1>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.description}</Markdown>
                    </Col>
                </Row>
          </Container>
          <Container className="sections">
            {data.page_sections.map((section) =>
                <Row key={section.id} className="section justify-content-center">
                    <Col xs={12} sm={4}>
                        <div className="image">
                            {/* <img src={section.image.url} /> */}
                            <Image
                                src={section.image.url}
                                alt="Hero illustration"
                                width={550}
                                height={550}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={5}>
                        <div className="txt-content">
                            <h1 className="title">{section.title}</h1>
                            <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{section.description}</Markdown>
                        </div>
                    </Col>
                </Row>
            )}
          </Container>
            <div className="choose-us">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={4}>
                        <div className="image">
                            <Image
                                src={data.choose_us.image.url}
                                alt="Prestation illustration"
                                width={550}
                                height={550}
                            />
                        </div>
                        </Col>
                        <Col xs={12} sm={5}>
                        <div className="txt-content">
                            <h2 className="title">{data.choose_us.title}</h2>
                            <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.choose_us.description}</Markdown>
                            <div className="choices">
                                {data.choose_us.card.map((card) =>
                                    <div key={card.id} className="choice">
                                    <div className="icon">
                                        <Image
                                            src={card.icon.url}
                                            alt="Icon prestation"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <div className="txt">
                                        <h3 className="title">{card.title}</h3>
                                    </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
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
  const res = await fetch('https://koleeum-admin.herokuapp.com/locataires')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}
