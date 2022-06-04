import React from 'react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { UserProvider } from '../lib/authContext'
import axios from "axios"
import { motion } from 'framer-motion'
// import Header from '../sections/globals/header'

export default function Layout({children}) {
    // console.log('layout props : ', props)

    return (
      <>
        {children}
      </>
    )
}
