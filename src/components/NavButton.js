import React from 'react'

export const NavButton = ({onClick, icon, content, hidden}) => {
  return (
    <div hidden={hidden}>
      <div className='navButton'
        onClick={onClick}>
        <i className={`glyphicon glyphicon-${icon} navIcon`} />
        <span>{content}</span>
      </div>
      <hr/>
    </div>
  )
}
