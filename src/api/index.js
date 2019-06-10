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
      return res
    })
}

// todo loutout

// PLAYERS
function getAllPlayers() {
  return api.get('/players')
}

function createNewPlayer(playerName) {
  return authenticatedAPI.post('/players/create_player')
}
// todo updateRegisterdPlayer


// GAMES
function getAllGames() {
  return api.get('/games')
}

function createNewGame(game) {
  return authenticatedAPI.post('games/create_game')
}
// todo update game


export default {
  login,
  getAllPlayers,
  getAllGames,
  createNewPlayer,
  createNewGame
}

