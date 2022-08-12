import PropTypes from 'prop-types';
import { PostEntry } from '../components/PostEntry';

export const PostTable = (props) => {

  const tableColumns = {
    Date: 'created_at',
    Name: 'username',
    Message: 'message'
  }

  const tableHeader = Object.entries(tableColumns).map((kv,i) => <div className="table-column" key={kv[1]??i}>{kv[0]}</div>)

  return (
    <div className="table posts">
      <header>
        {tableHeader}
      </header>
      <main>
        {props.postData.map((p,i) => <PostEntry key={p.id??i} post={p} columns={Object.values(tableColumns)}/>)}
      </main>
    </div>
  )
}

PostTable.propTypes = {
  postData: PropTypes.array,
}