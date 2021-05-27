import React from 'react';
import {PostCard} from './PostCard'
import Loading from './Loading'
import {fetchData} from '../utils/fetchNewsRepos'
import PropTypes from 'prop-types'

function hackerNewsReducer (state,action) {
  if(action.type === 'success'){
    return {
      ...state,
      loading:false,
      posts : action.posts
    }
  } else if(action.type === 'error'){
    return {
      ...state,
      loading:false,
      error: action.error
    }
  } else {
    throw new Error('invalid  action type')
  }
}

export default function Top ({type}){
  const [state, dispatch] = React.useReducer(
    hackerNewsReducer,
    {error:null, loading:true, posts:[]}
  )
  
  React.useEffect(() => {
    const abortController = new AbortController()
    console.log(type)
      fetchData(type)
      .then((posts)=> dispatch({
        type:'success',
        posts
      }))
      .catch((error) =>dispatch({
          type:'error',
          error:error
        }))

      return ()=> {
        abortController.abort()
      }
  },[type])

  const isLoading = () => {
    return !state.posts && state.error === null
  }
  console.log(state.posts)
  return(
    <React.Fragment>
      {isLoading() && <Loading />}
      {state.error !== null && <p>Error in fetching data</p>}
      <PostCard posts={state.posts} />
    </React.Fragment>
  )
}
/*export default class Top extends React.Component {
  constructor (props) {
    super (props)
    const type = this.props.type;
    this.state = {
      posts : [],
      loading:true,
      error:null,
      type: type
    }
    this.isLoading = this.isLoading.bind(this)
    this.fetchAPI = this.fetchAPI.bind(this)
  }

  componentDidMount () {
    this.fetchAPI(this.state.type)
  }

  componentDidUpdate (prevProps){
    if(this.props.type !== prevProps.type){
      this.fetchAPI(this.props.type)
    }
  }

fetchAPI (type){
    fetchData(type)
      .then((posts)=> {
        this.setState({
          posts,
          loading:false
        })
      })
      .catch((err) =>{
        this.setState({
          error:err
        })
      })
  }

  componentWillUnmount (){
    this.setState({
      posts:[]
    })
  }
  isLoading (){
    const {posts, error} = this.state
    return !posts && this.state.error === null
  }

  render (){
    const { posts, loading, error} = this.state
    return(
      <React.Fragment>
        {loading && error === null && <Loading />}
        {error !== null && <p>Error in fetching data</p>}
         <PostCard posts={posts} />
      </React.Fragment>
    )
  }
}
*/
Top.propsType = {
  type: PropTypes.string.isRequired
}