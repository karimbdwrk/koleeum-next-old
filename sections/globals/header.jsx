import { useState, useEffect, useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function Header() {
    // console.log('header props :', props)

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isActive, setActive] = useState('/')
    const [isOpen, setOpen] = useState(false)

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

    const navLinks = data.header.navigation.map(function(link) {
        return (
            <Link key={link.id} href={link.link}>
                <a 
                    className={isActive === link.link ? 'hvr-underline-from-left active' : 'hvr-underline-from-left'} 
                    onClick={() => { 
                        setActive(link.link) 
                        setOpen(false)
                    }}
                >
                    {link.title}
                </a>
            </Link>
        )
    })

    return (
        <header id="header">
            <Container>
                <Row>
                    <Col xs={8} sm={3} className="logo-container">
                        <div className='logo'>
                            <Link href='/'>
                                <a onClick={() => setActive('/')}>
                                    <Image
                                        src={data.header.logo.url}
                                        alt="Logo Koleeum.immo"
                                        width={200}
                                        height={50}
                                    />
                                </a>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} className={isOpen ? 'nav-container open' : 'nav-container'}>
                        <nav>
                            {navLinks}
                        </nav>
                    </Col>
                    <Col xs={4} sm={3} className="login-container">
                        <Link href={data.header.button.link}>
                            <a className="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                                <span>{data.header.button.title}</span>
                            </a>
                        </Link>
                        <button id="burger" onClick={() => setOpen(!isOpen ? true : false)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header

