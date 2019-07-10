import {API_URL} from './constants'
import axios from 'axios'
import AuthUtils from '../utils/authUtils'

const api = axios.create({
  baseURL: API_URL
})

function getAuthenticatedPostConfig() {
  return {
    baseURL: API_URL,
    headers: {'x-auth-token': AuthUtils.getToken()}
  }
}
// AUTH
function login(credentials) {
  return api
    .post('/auth/signin', credentials)
    .then( res => {
      AuthUtils.setToken(res.data.token)
      return AuthUtils.getUser(res.data.token)
    })
}

function register(credentials) {
  return api
    .post('/auth/signup', credentials)
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

function createNewPlayer(player) {
  return axios.post('/players/create_player', player, getAuthenticatedPostConfig())
}
// todo updateRegisterdPlayer
function updatePlayer(player) {
  return axios.post('/players/update_player', player, getAuthenticatedPostConfig())
}

// GAMES
function getAllGames() {
  return api
    .get('/games')
    .then( res => {
      return res.data
    })
}

function createNewGame(game) {
  console.log(AuthUtils.getToken())
  return axios.post('games/create_game', game, getAuthenticatedPostConfig())
}

// todo update game
function updateGame(game, gameID) { return }


export default {
  login,
  register,
  getAllPlayers,
  getAllGames,
  createNewPlayer,
  updatePlayer,
  createNewGame,
  updateGame
}

