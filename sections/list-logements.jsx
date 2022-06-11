import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

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
            <li key={logement.id}>
                <Link href={`/logement/${encodeURIComponent(logement.id)}`}>
                    <a>
                        {logement.title}
                    </a>
                </Link>
            </li>
        )
    })

    return (
        <>
            <p>logements list</p>
            <ul>
                { logements }
            </ul>
        </>
    )
}

export default LogementsList

