import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Layout from './layout'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import '../styles/main.css'

function MyApp({ Component, pageProps }) {

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
    <>
      <header>
        <div className="logo-container">
          <Link href="./"><a><img src={data.header.logo.url} /></a></Link>
        </div>
        <div className="nav-container">
          <nav>
            {data.header.navigation.map( function (nav) {
              return ( <Link key={nav.id} href={nav.link}><a>{nav.title}</a></Link> )
            })}
          </nav>
        </div> 
        <div className="login-container">
          <Button>Espace clients</Button>  
        </div>     
      </header>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp


