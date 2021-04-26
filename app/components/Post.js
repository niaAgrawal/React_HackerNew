import * as React from 'react'
import PropTypes, { number } from 'prop-types'
import queryString from 'query-string'
import {fetchUser , getComments, getPost} from '../utils/fetchNewsRepos'
import TimeConvertor from '../utils/TimeConvertor'
import { PostCard } from './PostCard'
import Loading from './Loading'
import { Link} from 'react-router-dom'
import Comments from './Comments'

export default class Post extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      profile: [],
      loadingProfile: true,
      comments: [],
      loadingComments: true,
      error:null
    }
  }

  componentDidMount () {
    const {id} = queryString.parse(this.props.location.search)
    console.log(id);
    return getPost(id)
    .then(profile => {
      this.setState({
        profile,
        loadingProfile: false
      })
      console.log(profile.kids)
      return getComments(profile.kids)
    })
    .then(comments => {
      console.log(comments)
      this.setState({
        comments,
        loadingComments: false
      })
    })

  }

  render (){
    const {loadingComments, loadingProfile, profile, comments} = this.state
    return (
      <React.Fragment>
        <div>
        {loadingProfile === true && <Loading text='fetching user profile' />}
        {profile !== '' && (
          <React.Fragment>
            <h2 style={{fontWeight:'bolder', color:'red'}}>{profile.title}</h2>
            <p>
            <span> by <Link to={{
                pathname:'/user',
                search:`?id=${profile.by}`
              }}>{profile.by}</Link>
            </span>
            <span> on {TimeConvertor(profile.time)}</span>
            {typeof profile.descendants === 'number' && (
              <span> with <Link to={`/post?id=${profile.id}`}>{profile.descendants}</Link> comments
              </span>
            )}
            </p>
          </React.Fragment>
        )}
        </div>
        <div>
        {loadingProfile === true && <Loading text='fetching user comments' />}
        { comments !== '' && (
          <React.Fragment>
            <Comments comments={comments}/>
          </React.Fragment>
        )}
        </div>
        
      </React.Fragment>
    )
  }
}
