import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import NewsletterForm from '../sections/components/newsletter-form'

export default function Home(props) {

  // const [home, setHome] = useState(props.home)

  return (
    <div className="homepage">
      <Head>
        <title>Koleeum.immo - Assets Management</title>
        <meta name="description" content="Structuration de SCI, Investissement, Gestion d'actifs, Asset Management immobilier. Nous donnons accès à tous à l'Asset Management, service habituellement réservé aux investisseurs institutionnels." />
        <link rel="icon" href="https://koleeum-aws-bucket.s3.eu-west-3.amazonaws.com/favicon_d3ad23822f.svg" />
      </Head>
      <div className="hero">
        <Container>
          <Row>
            <Col xs={12} sm={6}>
              <div className="txt-content">
                <h1 className="title">{props.home.hero.title}</h1>
                <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{props.home.hero.description}</Markdown>
                <a className="btn" target="_blank" rel="noreferrer" href={'https://' + props.home.hero.button.link}>{props.home.hero.button.title}</a>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="image">
                <Image
                  src={props.home.hero.image.url}
                  alt="Hero illustration"
                  width={550}
                  height={550}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col xs={12}>
              <div className="mouse-container">
                <div className="mouse"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="expertises">
        <Container>
          <Row className="title-container">
            <Col xs={12} sm={10}>
              <h1 className="title">{props.home.expertise.title}</h1>
              <Markdown className="description">{props.home.expertise.description}</Markdown>
            </Col>
          </Row>
          <Row className="cards">
              {props.home.expertise.card.map((card) => 
                <Col xs={12} sm={6} md={3}>
                  <div key={card.id} className="card">
                    <div className="icon">
                      <Image
                        src={card.icon.url}
                        alt="Icon expertise"
                        width={30}
                        height={30}
                      />
                    </div>
                    <h3 className="title">{card.title}</h3>
                    <Markdown className="description">{card.description}</Markdown>
                  </div>
                </Col>
              )}
          </Row>
        </Container>
      </div>
      <div className="services">        
        <Container>
          {props.home.services.service.map((service) =>
            <div key={service.id} className="service">
              <Row>
                <Col xs={12} sm={5}>
                  <div className="image">
                    <Image
                      src={service.image.url}
                      alt="Service illustration"
                      width={550}
                      height={550}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={7}>
                  <div className="txt-content">
                    <h1 className="title">{service.title}</h1>
                    <Markdown options={{ wrapper: 'p', forceWrapper: true }} className="description">{service.description}</Markdown>
                    <Link href={service.link}>
                        <a className="btn">En savoir plus</a>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
      <div className="prestations">
        <Container>
          <Row>
            <Col xs={12} sm={6}>
              <div className="image">
                  <Image
                    src={props.home.prestations.image.url}
                    alt="Prestation illustration"
                    width={550}
                    height={550}
                  />
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="txt-content">
                  <h2 className="title">{props.home.prestations.title}</h2>
                  <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{props.home.prestations.description}</Markdown>
                  <div className="prestas">
                      {props.home.prestations.card.map((card) =>
                          <div key={card.id} className="presta">
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
      <h2 className="title-actu">Actualité</h2>
      <div className="newsletter">
        <Container>
          <Row>
            <Col xs={12}>
                <h2 className="title">{props.home.newsletter.title}</h2>
                <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{props.home.newsletter.description}</Markdown>
                <div className="newsletter-form">
                    <NewsletterForm />
                </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://koleeum-admin.herokuapp.com/home')
  const home = await res.json()

  return {
    props: {
      home
    }
  }
}