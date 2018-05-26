export const LETTER_KEY = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8 }

export const rows = (userId, blackPlayerId) => {
  let rows = ['8', '7', '6', '5', '4', '3', '2', '1']
  if (userId && userId === blackPlayerId) {
    return rows.reverse()
  } else {
    return rows
  }
}

export const columns = (userId, blackPlayerId) => {
  let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  if (userId && userId === blackPlayerId) {
    return columns.reverse()
  } else {
    return columns
  }
}

export const findGravater = (player) => {
  if (player.id) {
    return `https://www.gravatar.com/avatar/${player.hashedEmail}`
  } else {
    return `https://robohash.org/${player.hashedEmail}`
  }
}
