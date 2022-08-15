import PropTypes from 'prop-types';
import { CreatePostForm } from './containers/CreatePostForm';

export const CreatePost = (props) => {

  console.log(props.pageData);



  const submitForm = async () => {

  }

  return (
    <>
      <div className="container"><h3>Create New Post</h3></div>
      <div className="container new-post">
        <CreatePostForm onSubmitForm={submitForm} />
      </div>
    </>
  )
}

CreatePost.propTypes = {
  pageData: PropTypes.any
}