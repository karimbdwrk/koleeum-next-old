import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Markdown from 'markdown-to-jsx'
import NewsletterForm from '../sections/components/newsletter-form'

export default function Home(props) {

  const [home, setHome] = useState(props.home)

  return (
    <div className="homepage">
      <Head>
        <title>Koleeum.immo - Assets Management</title>
        <meta name="description" content="Structuration de SCI, Investissement, Gestion d'actifs, Asset Management immobilier. Nous donnons accès à tous à l'Asset Management, service habituellement réservé aux investisseurs institutionnels." />
        <link rel="icon" href="https://koleeum-aws-bucket.s3.eu-west-3.amazonaws.com/favicon_d3ad23822f.svg" />
      </Head>
      <div className="hero">
        <div className="container">
          <div className="txt-content">
            <h1 className="title">{home.hero.title}</h1>
            <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{home.hero.description}</Markdown>
            <a className="btn" target="_blank" rel="noreferrer" href={'https://' + home.hero.button.link}>{home.hero.button.title}</a>
          </div>
          <div className="image">
            <Image
              src={home.hero.image.url}
              alt="Hero illustration"
              width={550}
              height={550}
            />
          </div>
        </div>
        <div className="container">
          <div className="mouse"></div>
        </div>
      </div>
      <div className="expertises">
        <div className="container">
            <h1 className="title">{home.expertise.title}</h1>
            <Markdown className="description">{home.expertise.description}</Markdown>
            <div className="cards">
              {home.expertise.card.map((card) => 
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
              )}
            </div>
        </div>
      </div>
      <div className="services">
        <div className="container">
          {home.services.service.map((service) =>
              <div key={service.id} className="service">
                <div className="image">
                  <Image
                    src={service.image.url}
                    alt="Service illustration"
                    width={550}
                    height={550}
                  />
                </div>
                <div className="txt-content">
                  <h1 className="title">{service.title}</h1>
                  <Markdown options={{ wrapper: 'p', forceWrapper: true }} className="description">{service.description}</Markdown>
                  <Link href={service.link}>
                      <a className="btn">En savoir plus</a>
                  </Link>
                </div>
              </div>
          )}
          
        </div>
      </div>
      <div className="prestations">
        <div className="container">
              <div className="image">
                  <Image
                    src={home.prestations.image.url}
                    alt="Prestation illustration"
                    width={550}
                    height={550}
                  />
              </div>
              <div className="txt-content">
                  <h2 className="title">{home.prestations.title}</h2>
                  <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{home.prestations.description}</Markdown>
                  <div className="prestas">
                      {home.prestations.card.map((card) =>
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
          
        </div>
      </div>
      <h2 className="title-actu">Actualité</h2>
      <div className="newsletter">
          <div className="container">
              <h2 className="title">{home.newsletter.title}</h2>
              <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{home.newsletter.description}</Markdown>
              <div className="newsletter-form">
                  <NewsletterForm />
              </div>
          
          </div>
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