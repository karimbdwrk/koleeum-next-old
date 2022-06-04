import { useState, useEffect, useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
// import { fetcher } from '../../lib/api'
// import { setToken, unsetToken } from '../../lib/auth'
// import { useUser } from '../../lib/authContext'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// import LoginBtn from '../components/login-btn'

function Header() {
    // console.log('header props :', props)

    // const [data, setData] = useState({
    //     identifier: '',
    //     password: ''
    // })
    const [pageData, setPageData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isActive, setActive] = useState('/')
    const [isOpen, setOpen] = useState(false)

    // const { user, loading } = useUser()

    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     const responseData = await fetcher(`https://koleeum-admin.herokuapp.com/auth/local`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 identifier: data.identifier,
    //                 password: data.password,
    //             }),
    //         }
    //     )
    //     setToken(responseData)
    // }

    // const logout = () => {
    //     unsetToken()
    // }

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }

    useEffect(() => {
        setLoading(true)
        fetch('https://koleeum-admin.herokuapp.com/global')
        .then((res) => res.json())
        .then((pageData) => {
            setPageData(pageData)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!pageData) return <p>No profile data</p>

    if (!pageData) return console.log('page data :', pageData)

    const navLinks = pageData.header.navigation.map(function(link) {
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
                                        src={pageData.header.logo.url}
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
                        <Link href={pageData.header.button.link}>
                            <a className="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                                <span>{pageData.header.button.title}</span>
                            </a>
                        </Link>
                        {/* <LoginBtn /> */}
                        <button id="burger" onClick={() => setOpen(!isOpen ? true : false)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </Col>
                </Row>
                {/* <Row>
                    <Col xs={12}>
                        <ul>
                        {!loading &&
                            (user ? (
                            <li>
                                <Link href="/profile">
                                <a className="md:p-2 py-2 block hover:text-purple-400">
                                    Profile
                                </a>
                                </Link>
                            </li>
                            ) : (
                            ''
                            ))}
                        {!loading &&
                            (user ? (
                            <li>
                                <a
                                className="md:p-2 py-2 block hover:text-purple-400"
                                onClick={logout}
                                style={{ cursor: 'pointer' }}
                                >
                                Logout
                                </a>
                            </li>
                            ) : (
                            ''
                            ))}
                        {!loading && !user ? (
                            <>
                            <li>
                                <form onSubmit={handleSubmit} className="form-inline">
                                <input
                                    type="text"
                                    name="identifier"
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="md:p-2 form-input py-2 rounded mx-2"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="md:p-2 form-input py-2 rounded mx-2"
                                    required
                                />

                                <button
                                    className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                                    type="submit"
                                >
                                    Login
                                </button>
                                </form>
                            </li>
                            <li>
                                <Link href="/register">
                                <a className="md:p-2 block py-2 hover:text-purple-400 text-black">
                                    Register
                                </a>
                                </Link>
                            </li>
                            </>
                        ) : (
                            ''
                        )}
                        </ul>
                    </Col>
                </Row> */}
            </Container>
        </header>
    )
}

export default Header

