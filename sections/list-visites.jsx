import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function VisitesList() {
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

    const links = data.map(function(link) {
        return (
            <li key={link.id}>
                <Link key={link.id} href={`/visite/${encodeURIComponent(link.id)}`}>
                    <a>
                        {link.title}
                    </a>
                </Link>
            </li>
        )
    })

    return (
        <>
            <p>visites list</p>
            <ul>
                { links }
            </ul>
        </>
    )
}

export default VisitesList

