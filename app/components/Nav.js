import React from 'react';
import { NavLink } from 'react-router-dom'
import { ThemeContext} from '../context/Theme'
import '../index.css'


const activeStyle = {
  color:'rgb(187, 46, 31)',
  fontWeight: 'bold'
}
export default function Nav ({toggle}) {
  const theme = React.useContext(ThemeContext)
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li><NavLink exact to='/' className='nav-link' activeStyle={activeStyle}> Top</NavLink></li>
        <li><NavLink to='/new' className='nav-link' activeStyle={activeStyle}> New</NavLink></li>
      </ul>
      <button
        className="themeSwitchBtn"
        onClick={toggle}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  )
}