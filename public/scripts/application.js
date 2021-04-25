const playersButton = document.querySelector('.teams')

playersButton?.addEventListener('click', async (e) => {
  e.preventDefault()
  console.log(playersButton)
  const response = await fetch(`/teams`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      "Authorization": "Bearer 651c7a5e-31af-46d1-b819-8644fbf6d27e",
      'Access-Control-Allow-Origin': '*'
    }
  })
  // const steamResponse = await response.json()
  // console.log(steamResponse)
  // for (let i = 0; i < steamResponse.length; i++) {

  // }
  window.location.assign('/teams')
})

const inputSearchButton = document.querySelector('#search-button')
console.log(inputSearchButton)

inputSearchButton?.addEventListener('click', async (e) => {
  e.preventDefault()
  const inputSearchText = document.querySelector('#search')
  console.log(inputSearchText.value)
  const test = inputSearchText.value
  const response = await fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      search: test
    })
  })
  const findedPlayer = await response.json()
  let container = document.querySelector('.container-players')
  container.innerText = ''
  findedPlayer.forEach((el) => {
    console.log(el)
    const divRow = document.createElement('div')
    const divCol = document.createElement('div')
    const divCard = document.createElement('div')
    const divCardWhite = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')
    const img = document.createElement('img')
    
    divRow.className = 'row'
    divCol.className = 'col s12 m6'
    divCard.className = 'card user-card'
    divCardWhite.className = 'card-content white-text'
    span.className = 'card-title'
    img.className = 'logo'
    
    img.src=el.avatarfull
    
    span.innerText = `nickname: ${el.personaname}`
    p.innerText = `account Id: ${el.account_id}`
    
    divCardWhite.append(span, p, img)
    divCard.append(divCardWhite)
    divCol.append(divCard)
    divRow.append(divCol)
    container.style.visibility = 'visible'
    container.append(divRow)
  });
  // window.location.assign('/')
  
})

