import React from 'react'
import { NavButton } from './NavButton'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'
import { resetGameAction, joinGameAction } from '../actions/gameActions'

const allGamesText = (token, id) => {
  if (token && id) {
    return 'My Games'
  } else {
    return 'Play'
  }
}

const analyticsText = (active) => {
  if (active) {
    return 'Hide Analytics'
  } else {
    return 'Analytics'
  }
}

export const SideBarContent = ({
  joinGameAction,
  user,
  game,
  handleAllGamesClick,
  analytics,
  handleAnalytics,
  resetGameAction,
  handleModalAction,
  isGamesPath
}) => {
  return (
    <div>
      <NavButton onClick={() => handleModalAction({createGame: true})}
        icon={'plus'}
        content={'Create Game'}
        hidden={!isGamesPath}
      />
      <NavButton onClick={() => joinGameAction(user.token)}
        icon={'search'}
        content={'Find Game'}
        hidden={!isGamesPath}
      />
      <NavButton onClick={handleAllGamesClick}
        icon={'knight'}
        content={allGamesText(user.token, game.id)}
        hidden={isGamesPath}
      />
      <NavButton onClick={() => console.log('watch all games')}
        icon={'facetime-video'}
        content={'View Games'}
        hidden={false}
      />
      <NavButton onClick={handleAnalytics}
        icon={'signal'}
        content={analyticsText(analytics.active)}
        hidden={isGamesPath}
      />
      <NavButton onClick={resetGameAction}
        hidden={isGamesPath}
        icon={'triangle-left'}
        content={'Reset'}
      />
    </div>
  )
}

const mapDispatchToProps = {
  handleModalAction,
  resetGameAction,
  joinGameAction,
};

const mapStateToProps = ({user, game, analytics}) => {
  return {user, game, analytics}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContent)
