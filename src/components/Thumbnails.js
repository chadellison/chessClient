import React from 'react'

export const Thumbnails = ({thumbnails}) => {
  return (
    <div className='col-lg-9 col-md-12 activeGames'>
      <hr/>
      <h3 className='activeGamesTitle'>Active Games</h3>
      <div className='row justify-content-center'>
        {thumbnails}
      </div>
    </div>
  )
}
