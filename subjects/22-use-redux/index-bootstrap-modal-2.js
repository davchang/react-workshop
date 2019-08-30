import React, { useState} from 'react'
import { Button, Modal } from 'react-bootstrap'

function useBootstrapModal(initialValue) {
  const [value, setValue] = useState(initialValue)

  function openModal() {
    setValue(true)
  }

  function closeModal() {
    setValue(false)
  }

  return ({
    value: value,
    openModal: openModal,
    closeModal: closeModal
  })
}

export default function HelloWorld() {
  const fooModal = useBootstrapModal(false)

  return (
    <>
      <Button variant="primary" className='foo button topNav__button -settings' onClick={fooModal.openModal}>
        Click to open modal
      </Button>

      <Modal className='foo' show={fooModal.value} onHide={fooModal.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Foo Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-modal-window">
            Hello World!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button -text" variant="secondary" onClick={fooModal.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
