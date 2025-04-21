let mainCurrencyCounter = 0
let currencyPerClick = 1

let boughtUpgrades = {
  "ask_on_reddit": 1,
  "google_it": 2,
  "tell_chatgtp_to_do_it": 0,
  "read_the_documentation": 0
}

//TODO
/*let statistics = {
  total_clicks: 0
}*/

function init() {
    const clicker = document.querySelector("#clickableArea")
    const display = document.querySelector("#currency")
    const sidebar = document.querySelector(".sidebar")
    const shopToggle = document.querySelector(".shopToggle")
  
    clicker.addEventListener("click", () => {
      mainCurrencyCounter += currencyPerClick
      display.innerText = mainCurrencyCounter
    })

    shopToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open')
      shopToggle.classList.toggle('open')
    })
  
    display.innerText = mainCurrencyCounter

    loadUpgrades()
  }

  function loadUpgrades() {
        fetch('upgrade_definitions.json')
    .then(res => res.json())
    .then(upgrades => {
      const sidebar = document.querySelector(".sidebar")

      upgrades.forEach(element => {
        const shopButton = document.createElement('button')
        let cost = element.base_cost * Math.floor(element.price_multiplier ** boughtUpgrades[element.id])

        shopButton.className = 'shopButton'
        shopButton.innerHTML = `
        <span class="name">${element.name}</span>
        <span class="desc">${element.description}</span>
        <span class="cost">Cost: ${cost}</span>
        <span class="fpc">FPC: ${element.fpc}</span>`

        //TODO: button event handling and purchase logic

        sidebar.appendChild(shopButton)
      })
    })
  }

  //TODO:
  function saveGame() {}
  //TODO:
  function loadGame() {}

window.onload = init()