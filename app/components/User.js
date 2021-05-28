import * as React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import {fetchUser , getUserPost} from '../utils/fetchNewsRepos'
import TimeConvertor from '../utils/TimeConvertor'
import { PostCard } from './PostCard'
import Loading from './Loading'


function ProfileData ({ about, created, id, karma}) {
  return (
    <div>
      <h2>{id}</h2>
      <p className='profileData'>joined <span style={{fontWeight: 'bolder'}}>{TimeConvertor(created)}</span>  has <span style={{fontWeight: 'bolder'}}>{karma}</span> karma</p>
      <p className ='aboutText' dangerouslySetInnerHTML={{
       __html: about
     }}/>
    </div>
  )
}

ProfileData.propsType = {
  about : PropTypes.string.isRequired,
  id : PropTypes.string.isRequired,
  created : PropTypes.number.isRequired,
  karma : PropTypes.number.isRequired
}

const  postsReducer = (state,action) =>{
  switch(action.type){
    case  'fetch':
      return {
        ...state,
        loadingUser:true,
        loadingPosts:true
      }
    case 'user':
      return {
        ...state,
        loadingUser:false,
        user:action.user
      };
    case 'posts':
      return {
        ...state,
        loadingPosts:false,
        posts:action.posts
      }
    case 'error' :
      return {
        ...state,
        loadingPosts:false,
        loadingUser:false,
        error:action.error
      }
  }
  
}
export default function  User ({ location }) {
  const { id } = queryString.parse(location.search)

  const [state, dispatch] = React.useReducer(
    postsReducer,
    { user: null, loadingUser: true, posts: null, loadingPosts: true, error: null }
  )

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    fetchUser(id)
      .then((user) => {
        dispatch({ type: 'user', user })
        return getUserPost(user.submitted.slice(0, 30))
      })
      .then((posts) => dispatch({ type: 'posts', posts }))
      .catch(({ message }) => dispatch({ type: 'error', message }))
  }, [id])

  const { user, posts, loadingUser, loadingPosts, error } = state

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

    return (
      <div>
        { loadingUser === true && <Loading text = 'fetching User data' /> }
        {loadingUser === false && user !== '' ?
          <ProfileData {...user} />
          : null
        }
        { loadingPosts === true && <Loading text = 'fetching User Posts' /> }
        {posts !== ''  && loadingPosts === false ?
          <div>
            <h2>Posts</h2>
            <PostCard posts={posts} />
          </div>
        : null
        } 
      </div>
    )
  
}

/*
export default class Post extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      id: '',
      profile:[],
      posts: [],
      loadingUser: true,
      loadingData: true,
      error: null
    }

    this.fetchUserAPI = this.fetchUserAPI.bind(this)
  }

  componentDidMount () {
    const { id } = queryString.parse(this.props.location.search)
    this.fetchUserAPI (id)
  }

  fetchUserAPI (id) {
    fetchUser(id)
      .then(profile => { 
        this.setState ({
          profile,
          loadingUser : false
        })
        return getUserPost(profile.submitted.slice(0,50))
      })
      .then(posts => {
          console.log(posts)
          this.setState ({
            posts,
            loadingData:false,
          })
      })
      .catch (err => this.setState ({
        error : err,
        loading : false
      })) 
  }
  render (){
    const { profile, posts, loadingData, loadingUser  } = this.state
    return (
      <div>
        { loadingUser === true && <Loading text = 'fetching User data' /> }
        {loadingUser === false && profile !== '' ?
          <ProfileData {...profile} />
          : null
        }
        { loadingData === true && <Loading text = 'fetching User Posts' /> }
        {posts !== ''  && loadingData === false ?
          <div>
            <h2>Posts</h2>
            <PostCard posts={posts} />
          </div>
        : null
        } 
      </div>
    )
  }
}
*/
