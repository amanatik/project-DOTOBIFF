const { Router } = require('express')
const router = Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.route('/')
  .get(async (req, res) => {
    
    res.render('index')
  })

router.get('/teams', async (req, res) => {
  const response = await fetch(`https://api.opendota.com/api/teams?api_key=${process.env.API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    }
  })
  const steamResponse = await response.json()
  const fullNameTeams = steamResponse.filter((el) => {
    return el.name !== ''
  })
  const teams = fullNameTeams.slice(0, 30)  
  res.render('teams', {teams})
  // res.json(teams)
})


router.post('/search', async (req, res) => {
  const search = req.body.search
  console.log(search)
  const response = await fetch(`https://api.opendota.com/api/search?q=${search}?api_key=${process.env.API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    }
  })
  const findPlayer = await response.json()
  res.json(findPlayer)
})

router.get('/search', async (req, res) => {
  res.render('index')
})

router.get('/stats', async (req, res) => {
  const response = await fetch(`https://api.opendota.com/api/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    }
  })
  const stats = await response.json()
  res.render('stats', {stats})
})

router.get('/matches', async (req, res) => {
  const response = await fetch('https://api.opendota.com/api/proMatches', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    }
  })
  const matches = await response.json()
  res.render('matches', {matches})
})

router.get('/replays/:id', async (req, res) => {
  const response = await fetch(`https://api.opendota.com/api/replays?match_id=${req.params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    }
  })
  const replay = await response.json()
  res.render('replay', {replay})
})

router.get('/players', async (req, res) => {
  const response = await fetch('https://api.opendota.com/api/proPlayers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    }
  })
  const answerProPlayers = await response.json()
  const players = answerProPlayers.slice(0,30)
  res.render('players', {players})
})

module.exports = router
