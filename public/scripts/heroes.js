const heroesButton = document.querySelector('.heroes')

heroesButton?.addEventListener('click', async (e) => {
  e.preventDefault()
  const response = await fetch('/heroes')
  const heroes = await response.json()
  console.log(heroes)
  window.location.assign('/heroes')
})
