import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'
import EvaluationForm from '../sections/components/evaluation-form'

export default function Evaluation(props) {

  const [data, setData] = useState(props.data)
  const [type, setType] = useState(null)

  useEffect(() => {
      if (type) {
            document.querySelector('.cards').classList.add('fadeOut')
            setTimeout(() => {
                document.querySelector('.cards').classList.add('d-none')
            }, 750)
            document.querySelector('.evaluation-form').classList.add('fadeIn')
            document.querySelector('.evaluation-form').classList.add(type)
      }
  })

  return (
    <div className="evaluation-page">
        <Head>
          <title>{data.SEO.meta_title}</title>
          <meta name="description" content={data.SEO.meta_description} />
          <meta name="robots" content={data.SEO.indexation ? "index, follow" : "noindex, nofollow"} />
        </Head>
        <div className="evaluation fadeIn">
            <div className="container">
                <h1 className="title">{data.title}</h1>
                <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{data.description}</Markdown>
                <div className="cards">
                    <div className="card" onClick={() => setType("investissement")}>
                        <img src="https://koleeum-bucket.s3.eu-west-3.amazonaws.com/prestations_298cab5807.svg" />
                        <h2>Investissement & Asset Management</h2>
                    </div>
                    <div className="card" onClick={() => setType("vente")}>
                        <img src="https://koleeum-bucket.s3.eu-west-3.amazonaws.com/prestations_298cab5807.svg" />
                        <h2>Vente</h2>
                    </div>
                    <div className="card" onClick={() => setType("gestion_locative")}>
                        <img src="https://koleeum-bucket.s3.eu-west-3.amazonaws.com/prestations_298cab5807.svg" />
                        <h2>Gestion Locative</h2>
                    </div>
                </div>
                <EvaluationForm type={type}/>
            </div>
        </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://koleeum-admin.herokuapp.com/evaluation')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}