import { useState, useEffect, useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function Header() {
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

    const navLinks = data.header.navigation.map(function(link) {
        return (
            <Link key={link.id} href={link.link}>
                <a className={isActive === link.link ? 'hvr-underline-from-left active' : 'hvr-underline-from-left'} onClick={() => setActive(link.link)}>{link.title}</a>
            </Link>
        )
    })

    return (
        <Container id="header">
            <Row>
                <Col xs={12} sm={3}>
                    <div className='logo'>
                        <Link href='/'>
                            <a onClick={() => setActive('/')}>
                                <img src={data.header.logo.url} />
                            </a>
                        </Link>
                    </div>
                </Col>
                <Col xs={12} sm={6}>
                    <nav>
                        {navLinks}
                    </nav>
                </Col>
                <Col xs={12} sm={3} className="login-container">
                    <Button variant="primary">Primary</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
