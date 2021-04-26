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
