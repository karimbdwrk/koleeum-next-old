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
    <div className="qui-sommes-nous">
      <Head>
        <title>Koleeum.immo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="about-us fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={9}>
                <h1 className="title">{data.title}</h1>
                <div className="text-content">
                    {data.text_content.map((paragraphe) =>
                        <div key={paragraphe.id} className="paragraphe">
                            <Markdown options={{ wrapper: 'div', forceWrapper: true }}>{paragraphe.text}</Markdown>
                        </div>
                    )}
                </div>
                <div className="image">
                    <img src={data.image.url} />
                </div>
                <div className="infos">
                    <h2 className="title">Informations de contact</h2>
                    <div className="contact-links">
                        <p>{data.telephone}</p>
                        <p>{data.email}</p>
                    </div>
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
  const res = await fetch('https://koleeum-admin.herokuapp.com/about-us')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}