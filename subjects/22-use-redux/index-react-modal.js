import React, { useState, useRef } from 'react'
import ReactModal from 'react-modal'

function useActionButton(name, onChangeCB) {
  const myRef = useRef(null)

  function handleClick() {
    onChangeCB()
  }

  return {
    ref: myRef,
    onClick: handleClick
  }
}

function useModal(initialValue) {
  const [value, setValue] = useState(initialValue)
  const myRef = useRef(null)

  function openModal() {
    setValue(true)
  }

  function closeModal() {
    setValue(false)
  }

  function handleOnAfterOpenModal() {
    /* TBD */
  }

  return ({
    ref: myRef,
    value: value,
    ariaHideApp: false,
    openModal: openModal,
    closeModal: closeModal,
    isOpen: value,
    shouldCloseOnOverlayClick: true,
    onAfterOpen: handleOnAfterOpenModal,
    onRequestClose: closeModal
  })
}

export default function HelloWorld() {
  const fooModal = useModal(false)
  const fooButton = useActionButton('foo', fooModal.openModal)

  return (
    <>
      <button {...fooButton}>Click to open modal</button>

      <ReactModal {...fooModal}>
        <div className="my-modal-window">
          Hello World!
        </div>
        <button onClick={fooModal.closeModal}>close</button>
      </ReactModal>
    </>
  )
}
