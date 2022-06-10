import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toString } from 'lodash';
import { Document, Page } from 'react-pdf'
import { getTokenFromServerCookie, getTokenFromLocalCookie, getUserFromLocalCookie } from '../../lib/auth'
import { fetcher } from '../../lib/api'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'

const Visite = ({ visite }) => {
  const router = useRouter()
  const { id } = router.query
  console.log(visite.error ? visite.error : visite.title)

//   console.log('get token :', getTokenFromServerCookie(req))
//   console.log('get user :', getUserFromLocalCookie())

//   const username = getUserFromLocalCookie()

//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = () => {
//       console.log('load sucess pdf !')
//   }

  return (
      <Container>
          <Row>
              <Col xs={12}>
                    <p>Visite: {id}</p>
                    <h1 className="title">{visite.title}</h1>
                    <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{visite.description}</Markdown>
                    {/* <p>{visite.document[0].doc.url}</p> */}
                    {/* <Document file={visite.document[0].doc.url} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document> */}
                    <iframe src={visite.document[0].doc.url + '#toolbar=0'} width="100%" height="990"></iframe>
                    {/* <p>Page {pageNumber} of {numPages}</p> */}
              </Col>
          </Row>
      </Container>
  ) 
}

export default Visite

// export async function getStaticPaths() {
//     const res = await fetch('https://koleeum-admin.herokuapp.com/visites')
//     const data = await res.json()

//     const paths = data.map(visite => {
//         return {
//             params: { id: visite.id.toString() }
//         }
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }

export async function getServerSideProps({req, params}) {
    const id = params.id
    const jwt = typeof window !== 'undefined' ? getTokenFromLocalCookie : getTokenFromServerCookie(req)
    const data = await fetcher(`https://koleeum-admin.herokuapp.com/visites/${id}`, jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    } : '')
    // const res = await fetch(`https://koleeum-admin.herokuapp.com/visites/${id}`)
    // const data = await res

    return {
        props: { visite: data }
    }
}