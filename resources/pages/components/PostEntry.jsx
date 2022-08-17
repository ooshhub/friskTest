/**
 * Row entry for PostTable - write one post to the table
 * 
 */

import PropTypes from 'prop-types';
import { SpoilerInput } from './SpoilerInput';

export const PostEntry = (props) => {

  const cells = props.columns.map((col,i) => {
    // Process the content of each cell
    const content =
      col === 'message' ? // PIN input for message content
        <SpoilerInput id={props.post.id} /> 
      : col === 'created_at' ? // convert epoch to ISO datetime
        new Date(props.post[col])?.toISOString()
      : props.post[col] ?? '???'; // plain value
    return (
      <div className="table-cell" key={col||i} data-column={col}>
        {content}
      </div>
    )
  });

  return (
    <div className="table-entry post" data-id={props.post.id}>
      {cells}
    </div>
  )
}

PostEntry.propTypes = {
  columns: PropTypes.array,
  post: PropTypes.object
}