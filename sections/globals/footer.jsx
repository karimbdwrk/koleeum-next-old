import { useState, useEffect, useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import ContactForm from '../components/contact-form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function Footer() {
    // console.log('header props :', props)

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isActive, setActive] = useState('/')

    useEffect(() => {
        setLoading(true)
        fetch('https://koleeum-admin.herokuapp.com/global')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    if (!data) return console.log('data :', data)

    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col xs={12} sm={3} className="logo-container">
                        <div className="logo">
                            <img src={data.footer_informations.logo.url} />
                            <p className="logo-address">{data.footer_informations.address}</p>
                            <p className="logo-tel">{data.footer_informations.telephone}</p>
                            <a className="logo-email" href={"mailto:" + data.footer_informations.email}>{data.footer_informations.email}</a>
                        </div>
                    </Col>
                    <Col xs={12} sm={5} className="columns-container">
                        {data.footer_navigation.map((column, index) => 
                            <div key={index} className="column">
                                <h3 className="title">{column.title}</h3>
                                <ul>
                                {/* {column.link.map((l, index) => 
                                    <li key={index}>{l.title}</li>
                                )} */}
                                { column.link.map((l, index) => {
                                return (
                                    <li key={index}>
                                        <Link key={index} href={l.link}><a className="hvr-underline-from-left">{l.title}</a></Link>
                                    </li>
                                    )
                                }) 
                                }
                                </ul>
                            </div>
                        )}
                    </Col>
                    <Col xs={12} sm={4} className="contact-container">
                        <ContactForm />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="copyright-container">                
                        <div className="reseaux-sociaux">
                            {data.social_network.map((social, index) => 
                                <a key={index} href={social.link} target="_blank" rel="noreferrer"><img alt="alternate-txt" src={social.icon.url} /></a>
                            )}
                        </div>
                        <div className="copyright">
                            <p>© koleeum.com - 2022</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <div key={0} className="container">
                <div className="logo">
                    <img src={data.footer_informations.logo.url} />
                    <p className="logo-address">{data.footer_informations.address}</p>
                    <p className="logo-tel">{data.footer_informations.telephone}</p>
                    <a className="logo-email" href={"mailto:" + data.footer_informations.email}>{data.footer_informations.email}</a>
                </div>
                {data.footer_navigation.map((column, index) => 
                    <div key={index} className="column">
                        <h3 className="title">{column.title}</h3>
                        <ul>
                        { column.link.map((l, index) => {
                        return (
                            <li key={index}>
                                <Link key={index} href={l.link}><a className="hvr-underline-from-left">{l.title}</a></Link>
                            </li>
                            )
                        }) 
                        }
                        </ul>
                    </div>
                )}
                <ContactForm />
                </div>
                <div key={1} className="container">
                <div className="reseaux-sociaux">
                    {data.social_network.map((social, index) => 
                        <a key={index} href={social.link} target="_blank" rel="noreferrer"><img alt="alternate-txt" src={social.icon.url} /></a>
                    )}
                </div>
                <div className="copyright">
                    <p>© koleeum.com - 2022</p>
                </div>
            </div> */}
        </footer>
    )
}

export default Footer