/**
 * List Posts page layout
 * 
 */

import PropTypes from 'prop-types';
import { PostTable } from "./containers/PostTable";

export const List = (props) => {

  // console.log(props.pageData);
  const posts = props.pageData || [];

  return (
    <>
      <div className="container"><h3>List of Posts</h3></div>
      {posts.length
        ? <div className="container post-table"><PostTable postData={posts}/></div>
        : <div className="container"><span>There&apos;s nothing to see here. Try adding a post!</span></div>
      }
    </>
  )
}

List.propTypes = {
  pageData: PropTypes.any
}
