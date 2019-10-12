import React from 'react'

export const Notation = ({index, onClick, notation}) => {
  return (
    <div key={`${index}Notation`} id={index}
      onClick={onClick}
      className='col-xs-6 move'>
        {`${index + 1}. ${notation}`}
    </div>
  )
}
