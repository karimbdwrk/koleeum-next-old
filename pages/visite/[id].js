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
import { DeprecatedLayoutGroupContext } from 'framer-motion';

const Visite = (props) => {
  const router = useRouter()
  const { id } = router.query
//   console.log(visite.error ? visite.error : visite.title)

  const [visite, setVisite] = useState(props.visite)
    // visite.document.map(docu => {
    //     console.log(docu.title)
    // })

//   console.log('get token :', getTokenFromServerCookie(req))
//   console.log('get user :', getUserFromLocalCookie())

//   const username = getUserFromLocalCookie()

//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = () => {
//       console.log('load sucess pdf !')
//   }

    const list = visite.document.map(function(docu) {
        return (
            <Row>
                <Col xs={12}>
                    <h3 className="title">{docu.title}</h3>
                    <iframe src={docu.doc.url + '#toolbar=0'} width="100%" height="990"></iframe>
                </Col>
            </Row>
        )
    })

  return (
      <Container className="visite-page">
          <Row>
              <Col xs={12}>
                    {/* <p>Visite: {id}</p> */}
                    <h1 className="title">{visite.title}</h1>
                    <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{visite.description}</Markdown>
                    <Container className="list-visites">
                        {list}
                    </Container>
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