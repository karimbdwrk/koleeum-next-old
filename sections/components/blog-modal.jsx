import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Markdown from 'markdown-to-jsx'
import Button from 'react-bootstrap/Button'
import Moment from "react-moment"

function BlogModal(props) {
    
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
            En savoir plus
        </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-blog"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.post.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={props.post.image.url} />
            {/* <p>{props.post.content}</p> */}
            <Markdown options={{ wrapper: 'div', forceWrapper: true }} className="description">{props.post.content}</Markdown>
            <Moment className="post-date" format="DD/MM/YYYY">{props.post.published_at}</Moment>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer> */}
      </Modal>
      </>
    );
}

export default BlogModal