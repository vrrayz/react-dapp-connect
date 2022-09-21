import React from 'react'

const Nav = (props) => {
  return (
    <nav className="custom-nav">
        <a href="/h" className="nav-brand">Dapp-Connect</a>
        {props.children}
      </nav>
  )
}

export default Nav