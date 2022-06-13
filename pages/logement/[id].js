import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetcher } from '../../lib/api'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Markdown from 'markdown-to-jsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import "swiper/css/navigation"

const Logement = (props) => {
  const router = useRouter()
  const { id } = router.query
//   console.log(visite.error ? visite.error : visite.title)

  const [logement, setLogement] = useState(props.logement)
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const slider = logement.photos.map(photo => <SwiperSlide key={photo.id}><img src={photo.url} /></SwiperSlide>)


  return (
      <div className="logement-page">
        <Container>
            <Row>
                <Col xs={12} sm={5}>
                    <div className="txt-container">
                        <h1 className="title">{logement.title}</h1>
                        <h2 className="subtitle">{logement.ville_quartier}</h2>
                        <p className="type">{logement.type}</p>
                        <div className="tags">
                            {logement.nbr_pieces && <p>{logement.nbr_pieces} pièce{logement.nbr_pieces > 1 ? 's' : ''}</p>}
                            {logement.surface && <p>{logement.surface} m2</p>}
                            {logement.etage && <p>{logement.etage}{logement.etage > 1 ? 'ème' : 'er'} étage</p>}
                            {logement.type == 'location' && <p>{logement.loyer}€ / mois</p>}
                            {logement.type == 'achat' && <p>{logement.prix} €</p>}
                        </div>
                        <h3 className="title">Description</h3>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{logement.description}</Markdown>
                        <h3 className="title">Caractéristiques</h3>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="caracteristiques">{logement.caracteristiques}</Markdown>
                        <h3 className="title">Informations supplémentaires</h3>
                        <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="infos-supp">{logement.informations_supplementaires}</Markdown>
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
                            <SwiperSlide key="cover"><img src={logement.cover.url} /></SwiperSlide>
                            {slider}
                        </Swiper>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="col-contact">
                    <a href="mailto:karim@badwork.fr" className="btn">Contactez-nous</a>
                </Col>
            </Row>
        </Container>
      </div>
  ) 
}

export default Logement

export async function getServerSideProps({ params }) {
    const id = params.id
    const data = await fetcher(`https://koleeum-admin.herokuapp.com/logements/${id}`)

    return {
        props: { logement: data }
    }
}