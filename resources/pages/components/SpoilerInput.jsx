/**
 * Handle 'reveal' PIN popup for messages
 * 
 */

import PropTypes from 'prop-types';
import { useRef } from 'react';

export const SpoilerInput = (props) => {

  // POST attempted PIN to backend API to retrieve message content
  const revealMessage = async (ev) => {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const formObject = Object.fromEntries(form.entries());
    if (formObject && window.ooxios) {
      const response = await window.ooxios.postRequest({
        url: `/api/comment/${formObject.id}`,
        data: formObject,
      });
      // Display validation error (bad PIN)
      if (response.data.error && validationRef.current) {
        validationRef.current.innerText = response.data.error;
      }
      // Display message if received from backend
      else if (response.data.message && messageRef.current) {
        messageRef.current.innerHTML = response.data.message
        togglePinModal(false);
      }
    }
  }

  const modalRef = useRef(null),
    messageRef = useRef(null),
    validationRef = useRef(null);

  // Open/close a Reveal modal
  const togglePinModal = (show = true) => {
    if (modalRef.current) {
      if (show) {
        Array.from(document.querySelectorAll('.modal.pin-entry')).forEach(el => el.style.display = 'none');
        modalRef.current.style.display = 'block';
        modalRef.current.querySelector('input[name="pin"]')?.focus();
      } else {
        modalRef.current.style.display = 'none';
      }
    }
  }

  return (
    <>
      <div ref={modalRef} className="modal pin-entry">
        <header>
          <span>Enter message PIN</span>
        </header>
        <form id={`form-${props.id}`} className="message-pin" onSubmit={(ev) => revealMessage(ev)}>
          <span>Please enter the 4-digit PIN:</span>
          <input type="hidden" name="id" value={props.id} />
          <input type="text" name="pin" pattern="[\d]{4}" maxLength="4" minLength="4"/>
          <span ref={validationRef} className="validation-error"></span>
        </form>
        <footer>
          <button className="nav-button" type="button" onClick={() => togglePinModal(false)}>Cancel</button>
          <button className="nav-button" type="submit" form={`form-${props.id}`}>OK</button>
        </footer>
      </div>
      <div ref={messageRef} className="message-content">
        <button onClick={togglePinModal}>Reveal</button>
      </div>
    </>
  )
}

SpoilerInput.propTypes = {
  id: PropTypes.any
}