import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'

function VisitesList({user}) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://koleeum-admin.herokuapp.com/visites')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    if (!data) return console.log('visites liste :', data)


    let visites = []
    
    data.map(visite => {
        visite.users_permissions_users.map(userP => {
            if (userP.username === user) {
                visites.push(visite)
            }
        })

    })
    console.log('visites :', visites)

    const visitesList = visites.map(function(visite) {
        if (visite) {
            return (
                <Col key={visite.id} xs={12} sm={10} md={9}>
                    <Link href={`/visite/${encodeURIComponent(visite.id)}`}>
                        <a>
                            <div className="card">
                                <div className="txt-container">
                                    <h2 className="title">{visite.title}</h2>
                                    <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{visite.description}</Markdown>
                                </div>
                                <div className="img-container">
                                    <img src={visite.cover.url} alt="cover img" />
                                </div>
                            </div>
                        </a>
                    </Link>
                </Col>
            )
        }
    })

    return (
        <Container>
            <Row>
                <Col>
                    <div className="visites-list">
                        <Container>
                            <Row className="justify-content-center">
                                { visitesList }
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default VisitesList

