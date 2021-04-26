import * as React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import TimeConvertor from '../utils/TimeConvertor'



export function PostCard (props) {
  if (props.posts.length === 0) {
    return (
      <p className='center-text'>
        This user hasn't posted yet
      </p>
    )
  }
  return (
    <ul>
      {props.posts.map((post) => {
        return(
        <li className="postFeed" key={post.id}>
          <div ><Link className="postTitle" to={post.url}> {post.title}</Link></div>
          <div className='postBody'>
            <span className="byText">by <Link 
                to={{
                  pathname: '/user',
                  search : `?id=${post.by}`
                }}>
                {post.by}
              </Link> 
            </span>   
            <span>
              on {TimeConvertor(post.time)} with </span>
            <span>
            <Link to={{
                pathname: '/post',
                search: `?id=${post.id}`
              }} 
              > {post.descendants}</Link> comments </span>
          </div>
        </li>
        )
      }
      )}
    </ul>
  )
}

PostCard.propsType = {
  posts: PropTypes.object.isRequired
} 