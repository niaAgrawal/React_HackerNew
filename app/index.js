import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import Top from './components/Top'
import Post from './components/Post'
import User from './components/User'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider} from './context/Theme'


class Apps extends React.Component{

  constructor (props) {
    super (props)

    this.state = {
      theme : 'light',
      toggle : () => {
        this.setState(({theme})=>({
          theme: theme === 'light' ?'dark':'light'
        }))
      }
    }
  }

  render () {
    return (
      <Router>
        <ThemeProvider value={this.state} >
          <div className={`bg-${this.state.theme}`}>
            <div className="container">
              <Nav />

              <Switch>
                <Route 
                  exact path="/" 
                  render= {()=> <Top type={'top'} />} 
                />
                <Route 
                  path="/new" 
                  render={()=> <Top type={'new'} />} 
                />
                <Route 
                  path="/user" 
                  component={User} /> 
                <Route 
                  path="/post" 
                  component={Post} />
                <Route 
                  render={()=> <h2>404 pages</h2>} 
                />
              </Switch>
            </div>
            </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(<Apps />, document.getElementById('app'));