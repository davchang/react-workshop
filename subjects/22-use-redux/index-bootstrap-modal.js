import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './styles.scss'

export default function HelloWorld() {

  function MyModal(props) {
    const { initialValue, mBody, mHeading } = props
    const [show, setShow] = useState(initialValue)

    function openModal() {
      setShow(true)
    }

    function closeModal() {
      setShow(false)
    }

    return (
      <>
        <Button variant="primary" onClick={openModal}>
          Launch demo modal
        </Button>

          <Modal className='' show={show} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{mHeading ? mHeading : "Modal heading"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{mBody ? mBody : "Woohoo, you're reading this text in a modal!"}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={closeModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
      </>
    )
  }

  function InputBlockWithModal(props) {
    return (
      <div className="inputBlock">
        <label className="label">{props.label}&nbsp;&nbsp;</label>
        <MyModal show={props.show} mHeading={props.mHeading} mBody={props.mBody} />

        <br/>
        {props.children}
      </div>
    )
  }

  return (
    <>
      <div className='foo'>
        <InputBlockWithModal label='Uplift Load' show={false} mHeading='Test Heading' mBody='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, sit at vero a doloremque mollitia earum laborum incidunt, provident consequuntur sapiente. Tempora rem obcaecati repudiandae aliquam perspiciatis illo vitae eius inventore ex voluptates sapiente dolores, deserunt, ad itaque. Saepe maiores atque ab ratione aperiam architecto, aut voluptas mollitia magnam rerum ea tenetur officia aliquam quo possimus similique laudantium expedita vel! Accusantium est consequuntur ratione, sapiente molestiae maxime vitae architecto eius doloribus provident eos, dignissimos unde facilis quasi modi labore voluptatibus! Asperiores consequuntur provident, ex totam ratione sequi praesentium magni voluptatem illum numquam sed nobis, incidunt sapiente neque beatae, pariatur dolore!' >
          <input value='default input value'/>
        </InputBlockWithModal>
      </div>

      <br/>  <br/>
      <div className='foo'>
        <InputBlockWithModal label='Post Height' show={false} mHeading='foo text 2' mBody='bar text 2' >
          <input value='default input value for Post Height'/>
        </InputBlockWithModal>
      </div>
    </>
  )
}
