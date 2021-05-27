import * as React from 'react'
import PropTypes, { number } from 'prop-types'
import queryString from 'query-string'
import {fetchUser , getComments, getPost} from '../utils/fetchNewsRepos'
import TimeConvertor from '../utils/TimeConvertor'
import { PostCard } from './PostCard'
import Loading from './Loading'
import { Link} from 'react-router-dom'
import Comments from './Comments'

function PostRuducer (state,action) {
  if(action.type === 'profileSuccess'){
    return {
      ...state,
      profile: action.profile,
      loadingProfile:false
    }
  } else if(action.type === 'commentSuccess'){
    return {
      ...state,
      comments: action.comments,
      loadingComments:false
    }
  } else{
    throw new Error('invalid type')
  }
}
export default function Post ({location}) {
  const [state, dispatch] = React.useReducer(
    PostRuducer,
    {profile:[],loadingProfile:true,comments:[],loadingComments:true,error:null}
  )
  const {id} = queryString.parse(location.search)

  React.useEffect(()=>{
    console.log(id);
    return getPost(id)
    .then(profile => {
      dispatch({
        type: 'profileSuccess',
        profile
      })
      return getComments(profile.kids)
    })
    .then(comments => dispatch({
        type:'commentSuccess',
        comments,
        loadingComments: false
    }))
  },[id])

  return (
    <React.Fragment>
      <div>
      {state.loadingProfile === true && <Loading text='fetching user profile' />}
      {state.profile !== '' && (
        <React.Fragment>
          <h2 style={{fontWeight:'bolder', color:'red'}}>{state.profile.title}</h2>
          <p>
          <span> by <Link to={{
              pathname:'/user',
              search:`?id=${state.profile.by}`
            }}>{state.profile.by}</Link>
          </span>
          <span> on {TimeConvertor(state.profile.time)}</span>
          {typeof state.profile.descendants === 'number' && (
            <span> with <Link to={`/post?id=${state.profile.id}`}>{state.profile.descendants}</Link> comments
            </span>
          )}
          </p>
        </React.Fragment>
      )}
      </div>
      <div>
      {state.loadingProfile === true && <Loading text='fetching user comments' />}
      { state.comments !== '' && (
        <React.Fragment>
          <Comments comments={state.comments}/>
        </React.Fragment>
      )}
      </div>
      
    </React.Fragment>
  )
}
/*export default class Post extends React.Component {
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
*/
