import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Layout from './layout'
import Header from '../sections/globals/header'
import Footer from '../sections/globals/footer'
import 'bootstrap/dist/css/bootstrap.min.css'
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
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </>
  )
}

export default MyApp


