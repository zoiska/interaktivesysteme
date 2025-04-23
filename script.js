let currencyCounter = 0
let currencyPerClick = 1


/*
  List of bought Upgrades
*/

let boughtUpgrades = {
  "ask_on_reddit": 0,
  "google_it": 0,
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
    const sidebarOptions = document.querySelector(".sidebarOptions")
    const sidebarShop = document.querySelector(".sidebarShop")
    const optionsToggle = document.querySelector(".optionsToggle")
    const shopToggle = document.querySelector(".shopToggle")
    const resetButton = document.querySelector(".resetButton")
  
    clicker.addEventListener("click", () => {
      currencyCounter += currencyPerClick
      display.innerText = currencyCounter
      saveGame()
    })

    resetButton.addEventListener("click", () => {
      resetProgress()
      location.reload()
    })

    optionsToggle.addEventListener('click', () => {
      sidebarOptions.classList.toggle('open')
      optionsToggle.classList.toggle('open')
    })

    shopToggle.addEventListener('click', () => {
      sidebarShop.classList.toggle('open')
      shopToggle.classList.toggle('open')
    })

    loadUpgrades()
    loadSave()

    display.innerText = currencyCounter
  }


/*
  This function loads bought Upgrades
*/

function loadUpgrades() {
      fetch('upgrade_definitions.json')
  .then(res => res.json())
  .then(upgrades => {
    const sidebar = document.querySelector(".sidebarShop")

    upgrades.forEach(element => {
      const shopButton = document.createElement('button')
      let cost =  element.base_cost * Math.floor((boughtUpgrades[element.id] + 1) ** element.price_multiplier)

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

function saveGame() {
  localStorage.setItem("savedCurrencyCurrency", currencyCounter)
  localStorage.setItem("savedBoughtUpgrades", JSON.stringify(boughtUpgrades))
}

function loadSave() {
  savedCurrency = Number(localStorage.getItem("savedCurrencyCurrency"))
  if(savedCurrency !== null) {
    currencyCounter = savedCurrency
  }

  const savedUpgrades = localStorage.getItem("savedBoughtUpgrades")
  const parsedUpgrades = JSON.parse(savedUpgrades)

  if(parsedUpgrades !== null) {
    for(let key in boughtUpgrades) {
      if(parsedUpgrades.hasOwnProperty(key)) {
        boughtUpgrades[key] = parsedUpgrades[key]
      }
    }
  }
}

function resetProgress() {
  localStorage.clear("savedCurrencyCurrency")
  localStorage.clear("savedBoughtUpgrades")
}

window.onload = init()