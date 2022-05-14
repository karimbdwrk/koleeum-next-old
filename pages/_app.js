import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Layout from './layout'
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
          {data.header.navigation.map( function (nav) {
            return ( <Link key={nav.id} href={nav.link}><a>{nav.title}</a></Link> )
          })}
        </div> 
        <div className="login-container">
          <button>Espace clients</button>  
        </div>     
      </header>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp


