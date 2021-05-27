import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import Loading from './components/Loading'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeContext} from './context/Theme'


const Top = React.lazy(()=>import('./components/Top'))
const Post = React.lazy(()=>import('./components/Post'))
const User = React.lazy(()=>import('./components/User'))


function Apps () {
  const [theme, setTheme] = React.useState('light')

  const toggle = () => setTheme((theme)=> theme === 'light' ? 'dark':'light')
  return (
    <Router>
      <ThemeContext.Provider value={theme} >
        <div className={`bg-${theme}`}>
          <div className="container">
            <Nav toggle={toggle}/>
          <React.Suspense fallback={<Loading />} >
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
            </React.Suspense>
          </div>
          </div>
      </ThemeContext.Provider>
    </Router>
  )

}
/*class Apps extends React.Component{

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
            <React.Suspense fallback={<Loading />} >
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
              </React.Suspense>
            </div>
            </div>
        </ThemeProvider>
      </Router>
    )
  }
}
*/
ReactDOM.render(<Apps />, document.getElementById('app'));