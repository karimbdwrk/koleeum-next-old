import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetcher } from '../../lib/api'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Logement = (props) => {
  const router = useRouter()
  const { id } = router.query
//   console.log(visite.error ? visite.error : visite.title)

  const [logement, setLogement] = useState(props.logement)

  const slider = logement.photos.map(photo => <SwiperSlide key={photo.id}><img src={photo.url} /></SwiperSlide>)


  return (
      <Container className="logement-page">
          <Row>
                <Col xs={12} sm={6}>
                    <h1 className="title">{logement.title}</h1>
                    <div className="tags">
                        {logement.nbr_pieces && <p>{logement.nbr_pieces} pièce{logement.nbr_pieces > 1 ? 's' : ''}</p>}
                        {logement.surface && <p>{logement.surface} m2</p>}
                        {logement.etage && <p>{logement.etage}{logement.etage > 1 ? 'ème' : 'er'} étage</p>}
                    </div>
                    <h2 className="title">Description</h2>
                    <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{logement.description}</Markdown>
                    <h2 className="title">Caractéristiques</h2>
                    <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="caracteristiques">{logement.caracteristiques}</Markdown>
                    <h2 className="title">Informations supplémentaires</h2>
                    <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="infos-supp">{logement.informations_supplementaires}</Markdown>
                </Col>
                <Col xs={12} sm={6}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        >
                        <SwiperSlide key="cover"><img src={logement.cover.url} /></SwiperSlide>
                        {slider}
                    </Swiper>
                </Col>
          </Row>
      </Container>
  ) 
}

export default Logement

export async function getServerSideProps({ params }) {
    const id = params.id
    const data = await fetcher(`https://koleeum-admin.herokuapp.com/logements/${id}`)
    // const data = await res

    return {
        props: { logement: data }
    }
}