/**
 * Create post page layout (default page)
 * 
 */

import PropTypes from 'prop-types';
import { CreatePostForm } from './containers/CreatePostForm';

export const CreatePost = () => {

  return (
    <>
      <div className="container"><h3>Create New Post</h3></div>
      <div className="container new-post">
        <CreatePostForm />
      </div>
    </>
  )
}

CreatePost.propTypes = {
  pageData: PropTypes.any
}