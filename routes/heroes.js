const { Router } = require('express')
const router = Router()
const fetch = require('node-fetch')
require('dotenv').config()


router.get('/heroes', async (req, res) => {
  const response = await fetch(`https://api.opendota.com/api/heroStats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    },
  })
  const heroes = await response.json()
  // const teams = steamResponse.slice(0, 30)
  const agi = heroes.filter((el) => {
    return el.primary_attr === 'agi'
  })
  const str = heroes.filter((el) => {
    return el.primary_attr === 'str'
  })
  const int = heroes.filter((el) => {
    return el.primary_attr === 'int'
  })
  const roles = heroes.map(el => {
    return el.roles.map(element => {
      return element
    })
  })
  console.log(roles)
  res.render('heroes', {agi, str, int, roles})
  // res.json(heroes)
})

router.get('/rankbyhero/:id', async (req, res) => {
  const response = await fetch(`https://api.opendota.com/api/rankings?hero_id=${req.params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e"
    }
  })
  const statsAboutHero = await response.json()
  const topPlayersByHero = statsAboutHero.rankings
  console.log(topPlayersByHero)
  res.render('rank-by-hero', {topPlayersByHero})
})

module.exports = router

// Recent match with hero
// https://api.opendota.com/api/heroes/11/matches
