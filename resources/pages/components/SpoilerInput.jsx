import PropTypes from 'prop-types';

export const SpoilerInput = (props) => {

  // POST attempted PIN to retrieve message content
  const revealMessage = (ev) => {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const obj = Object.fromEntries(form.entries());
    console.log(`Submitting PIN`, obj);
  }

  return (
    <>
    {/* Hide when PIN success */}
      <form className="message-pin" onSubmit={revealMessage}>
        <span>Enter PIN to reveal message.</span>
        <input type="hidden" name="id" value={props.id} />
        <input type="text" name="pin" pattern="[\d]{4}" maxLength="4" minLength="4"/>
        <button action="submit">Get Message</button>
      </form>
    {/* Show when PIN success */}
      <div className="message-content"></div>
    </>
  )
}

SpoilerInput.propTypes = {
  id: PropTypes.any
}