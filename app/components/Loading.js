import React from 'react'
import PropTypes from 'prop-types'

const style = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  }
}
export default class Loading extends React.Component{

  constructor (props){
    super (props)

    this.state ={
      content: props.text
    }
  }
  componentDidMount (){
    const {text} = this.props

    this.interval = window.setInterval(()=> {
        if(this.state.content === text + '...'){
          console.log(this.state.content)
          this.setState({
            content: text
          })
        }else{
          this.setState((prevState)=>({content: prevState.content + '.'}))
        }
    },300)
  }

  componentWillUnmount (){
    window.clearInterval(this.interval)
  }

  render (){

    return (
      <p
        style={style.content}
      >{this.state.content}</p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

Loading.defaultProps = {
  text: 'LOADING'
}