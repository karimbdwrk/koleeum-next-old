// import { SessionProvider } from "next-auth/react"
import { useState, useEffect, useLayoutEffect } from 'react'
import { useFetchUser, UserProvider } from "../lib/authContext"
import Link from 'next/link'
import Layout from './layout'
import Header from '../sections/globals/header'
import Footer from '../sections/globals/footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/main.css'

function MyApp({ 
  Component, 
  pageProps: { ...pageProps }, 
}) {

  const { user, loading } = useFetchUser()

  return ( 
    <>
      <UserProvider value={{ user, loading }}>
        <Header user={user} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </UserProvider>
    </>
  )
}

export default MyApp


