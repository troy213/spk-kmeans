import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

const Modal = ({ open, children, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target.id === 'modal') {
      onClose()
    }
  }

  if (!open) {
    return null
  }

  return ReactDOM.createPortal(
    <div className='modal' id='modal' onClick={handleClickOutside}>
      <div className='modal-container'>
        <span className='modal-close' onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal
