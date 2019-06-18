import {API_URL} from './constants'
import axios from 'axios'
import AuthUtils from '../utils/authUtils'

const token = window.localStorage.getItem('token')

const api = axios.create({
  baseURL: API_URL
})

const authenticatedAPI = axios.create({
  baseURL: API_URL,
  headers: {'x-auth-token': token}
})

// AUTH
function login(credentials) {
  return api
    .post('/auth/signin', credentials)
    .then( res => {
      AuthUtils.setToken(res.data.token)
      return AuthUtils.getUser(res.data.token)
    })
}

// PLAYERS
function getAllPlayers() {
  return api
    .get('/players')
    .then( res => {
      return res.data
    })
}

function createNewPlayer(playerName) {
  return authenticatedAPI.post('/players/create_player')
}
// todo updateRegisterdPlayer


// GAMES
function getAllGames() {
  return api
    .get('/games')
    .then( res => {
      return res.data
    })
}

function createNewGame(game) {
  return authenticatedAPI.post('games/create_game', game)
}

// todo update game
function updateGame(game, gameID) { return }


export default {
  login,
  getAllPlayers,
  getAllGames,
  createNewPlayer,
  createNewGame,
  updateGame
}

