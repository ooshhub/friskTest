import PropTypes from 'prop-types';
import { Helpers } from '../js/helpers';

export const Options = (props) => {

  console.log(props.pageData);

  const exportCsv = async () => {
    const response = await window.ooxios.getRequest({
      url: '/api/csvSummary'
    });
    if (response.data && Array.isArray(response.data)) {
      const csvString = response.data.join(', ');
      Helpers.saveTextToFile(csvString, `Post Summary.csv`);
    }
  }

  const loadPixel = async () => {
    const data = {
      timestamp: Date.now(),
      detail: 'Stuff happened'
    };
    const payload = Helpers.stringToBase64(JSON.stringify(data));
    const newImg = document.createElement('img');
    newImg.src = `/api/test/${payload}.png`;
    newImg.classList.add('pixel');
    document.querySelector('#pixel-container').append(newImg);
    // const response = await window.ooxios.getRequest({ url: `/api/test/${payload}.png` });
    // console.info(response.response?.data ?? response.data, response);
  }

  return (
    <>
      <div className="container"><h3>Options</h3></div>
      <div className="container options">
        <div className="option-group">
          <h4>Export</h4>
          <button className="options-button" onClick={exportCsv}>Export CSV Summary</button>
        </div>
      </div>
      <div className="container options">
        <div className="option-group">
          <h4>Pixel</h4>
          <button className="options-button" onClick={loadPixel}>Tracker test</button>
          <div id="pixel-container"></div>
        </div>
      </div>
    </>
  )
}

Options.propTypes = {
  pageData: PropTypes.any
}