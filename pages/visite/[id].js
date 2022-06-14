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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import "swiper/css/navigation"

const Visite = (props) => {
  const router = useRouter()
  const { id } = router.query
//   console.log(visite.error ? visite.error : visite.title)

  const [visite, setVisite] = useState(props.visite)

  const slider = visite.photos.map(photo => <SwiperSlide key={photo.id}><img src={photo.url} /></SwiperSlide>)

    const list = visite.document.map(function(docu) {
        return (
            <Row key={docu.id}>
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
                <Col xs={12} sm={5}>
                    <div className="txt-container">
                        <h1 className="title">{visite.title}</h1>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{visite.description}</Markdown>
                    </div>
                </Col>
                <Col xs={12} sm={7}>
                    <div className="slider-container">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            navigation={true} modules={[Navigation]}
                            >
                            {slider}
                        </Swiper>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} sm={10}>
                    <div className="list-docs">
                        {list}
                    </div>
                </Col>
            </Row>
        </Container>
    ) 
}

export default Visite

export async function getServerSideProps({req, params}) {
    const id = params.id
    const jwt = typeof window !== 'undefined' ? getTokenFromLocalCookie : getTokenFromServerCookie(req)
    const data = await fetcher(`https://koleeum-admin.herokuapp.com/visites/${id}`, jwt ? {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    } : '')

    return {
        props: { visite: data }
    }
}