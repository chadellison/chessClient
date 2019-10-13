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

const viewGamesText = (pathname) => {
  if (pathname === '/allGames') {
    return 'Board'
  } else {
    return 'View Games'
  }
}

const showLoggedInOptions = (pathname, userId) => {
  return userId && (pathname === '/games' || pathname === '/allGames')
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
  pathname,
  handleViewAllGamesClick
}) => {
  return (
    <div>
      <NavButton onClick={() => handleModalAction({createGame: true})}
        icon={'plus'}
        content={'Create Game'}
        hidden={!showLoggedInOptions(pathname, user.id)}
      />
      <NavButton onClick={() => joinGameAction(user.token)}
        icon={'search'}
        content={'Find Game'}
        hidden={!showLoggedInOptions(pathname, user.id)}
      />
      <NavButton onClick={handleAllGamesClick}
        icon={'knight'}
        content={allGamesText(user.token, game.id)}
        hidden={pathname === '/games'}
      />
      <NavButton onClick={() => handleViewAllGamesClick(pathname)}
        icon={'facetime-video'}
        content={viewGamesText(pathname)}
        hidden={false}
      />
      <NavButton onClick={handleAnalytics}
        icon={'signal'}
        content={analyticsText(analytics.active)}
        hidden={pathname === '/games' || pathname === '/allGames'}
      />
      <NavButton onClick={resetGameAction}
        icon={'triangle-left'}
        content={'Reset'}
        hidden={pathname === '/games' || pathname === '/allGames'}
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
