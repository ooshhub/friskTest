/**
 * Options page layout
 */

import PropTypes from 'prop-types';
import { Helpers } from '../js/helpers';

export const Options = () => {

  // Export unique email/post count as csv
  const exportCsv = async () => {
    const response = await window.ooxios.getRequest({
      url: '/api/csvSummary'
    }).catch(e => console.error(e));
    if (response.data && typeof(response.data) === 'string') {
      Helpers.saveTextToFile(response.data, `Post Summary.csv`);
    }
  }

  // Tracaker testing
  const loadPixel = async () => {
    // const data = {
    //   timestamp: Date.now(),
    //   detail: 'Stuff happened'
    // };
    // const payload = Helpers.stringToBase64(JSON.stringify(data));
    // const newImg = document.createElement('img');
    // newImg.src = `/api/test/${payload}.png`;
    // newImg.classList.add('pixel');
    // document.querySelector('#pixel-container').append(newImg);
  }

  return (
    <>
      <div className="container"><h3>Options</h3></div>
      <div className="container options">
        <div className="option-group">
          <h4>Export</h4>
          <div className="option">
            <span className="label">Export unique emails/post count as CSV:</span>
            <button className="options-button" onClick={exportCsv}>Export</button>
          </div>
        </div>
        <div className="option-group">
          <h4>Pixel</h4>
          <div className="option">
            <span className="label">Test Button:</span>
            <button className="options-button disabled" onClick={loadPixel}>Test</button>
          </div>
          <div id="pixel-container"></div>
        </div>
      </div>
    </>
  )
}

Options.propTypes = {
  pageData: PropTypes.any
}