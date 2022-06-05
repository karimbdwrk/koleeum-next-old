import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toString } from 'lodash';
import { Document, Page } from 'react-pdf'

const Visite = ({ visite }) => {
  const router = useRouter()
  const { id } = router.query

//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = () => {
//       console.log('load sucess pdf !')
//   }

  return (
    <>

        <p>Visite: {id}</p>
        <p>{visite.title}</p>
        <p>{visite.description}</p>
        {/* <p>{visite.document[0].doc.url}</p> */}
        {/* <Document file={visite.document[0].doc.url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document> */}
        {/* <iframe src={visite.document[0].doc.url + '#toolbar=0'} width="100%" height="990"></iframe> */}
        {/* <p>Page {pageNumber} of {numPages}</p> */}
    </>
  ) 
}

export default Visite

export async function getStaticPaths() {
    const res = await fetch('https://koleeum-admin.herokuapp.com/visites')
    const data = await res.json()

    const paths = data.map(visite => {
        return {
            params: { id: visite.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id
    const res = await fetch('https://koleeum-admin.herokuapp.com/visites/' + id)
    const data = await res.json()

    return {
        props: { visite: data }
    }
}