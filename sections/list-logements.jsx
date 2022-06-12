import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function LogementsList() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://koleeum-admin.herokuapp.com/logements')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    if (!data) return console.log('logements liste :', data)


    const logements = data.map(function(logement) {
        return (
            <Col key={logement.id} xs={12} sm={6} md={4}>
                <Link href={`/logement/${encodeURIComponent(logement.id)}`}>
                    <a>
                    <Card>
                        <div className="img-container">
                            <Card.Img variant="top" src={logement.cover.url} />
                        </div>
                        <Card.Body>
                            <Card.Title>
                                {logement.title}
                                {logement.ville_quartier && <p className="subtitle">{logement.ville_quartier}</p>}
                                {logement.type && <p className="type">{logement.type}</p>}
                            </Card.Title>
                            <div className="tags">
                                {logement.nbr_pieces && <p>{logement.nbr_pieces} pièce{logement.nbr_pieces > 1 ? 's' : ''}</p>}
                                {logement.surface && <p>{logement.surface} &#13217;</p>}
                                {logement.etage && <p>Étage {logement.etage}</p>}
                                {logement.type == 'location' && <p>{logement.loyer}€/mois</p>}
                                {logement.type == 'achat' && <p>{logement.prix}€</p>}
                            </div>
                        </Card.Body>
                    </Card>
                    </a>
                </Link>
            </Col>
        )
    })

    return (
        <Container className="logements-list">
            <Row>
                { logements }
            </Row>
        </Container>
    )
}

export default LogementsList

