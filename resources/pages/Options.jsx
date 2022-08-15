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

  return (
    <>
      <div className="container"><h3>Options</h3></div>
      <div className="container options">
        <div className="option-group">
          <h4>Export</h4>
          <button className="options-button" onClick={exportCsv}>Export CSV Summary</button>
        </div>
      </div>
    </>
  )
}

Options.propTypes = {
  pageData: PropTypes.any
}