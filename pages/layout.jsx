import React from 'react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from "axios"
import { motion } from 'framer-motion'
// import Header from '../sections/globals/header'

export default function Layout(props) {
    // console.log('layout props : ', props)

    return (
      <>
        <main>
          {props.children}
        </main>
      </>
    )
}
