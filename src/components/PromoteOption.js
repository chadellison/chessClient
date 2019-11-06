import React from 'react'

export const PromoteOption = ({id, turn, onClick, icon}) => {
  return (
    <i
      id={id}
      className={`glyphicon glyphicon-${icon} promotePawn piece-${turn}`}
      onClick={(e) => onClick(e)}
    />
  )
}
