import * as React from 'react'
import PropTypes, { number } from 'prop-types'
import TimeConvertor from '../utils/TimeConvertor'
import {Link} from 'react-router-dom'

export default function Comments (props) {
  console.log('props.comments')
  console.log(props.comments)
  return (
    <ul>
      {props.comments.map((post) => {
        return(
        <li className='commentBody' key={post.id}>
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
            
            <p
              dangerouslySetInnerHTML= {{
                __html :post.text
              }}
            />
          </div>
        </li>
        )
      }
      )}
    </ul>
  )
}