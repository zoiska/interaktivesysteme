let currencyCounter = 0
let currencyPerClick = 1


/*
  boughtUpgrades object initialization
  these are always 0 !
*/
let boughtUpgrades = {
  ask_on_reddit: 0,
  google_it: 0,
  tell_chatgtp_to_do_it: 0,
  read_the_documentation: 0
}

//TODO
/*let statistics = {
  total_clicks: 0
}*/

function init() {
  const clicker = document.querySelector("#clickableArea")
  const sidebarOptions = document.querySelector(".sidebarOptions")
  const sidebarShop = document.querySelector(".sidebarShop")
  const optionsToggle = document.querySelector(".optionsToggle")
  const shopToggle = document.querySelector(".shopToggle")
  const resetButton = document.querySelector(".resetButton")

  clicker.addEventListener("click", () => {
    currencyCounter += currencyPerClick
    updateDisplay()
    saveGame()                                    //save game, this will have to move at some point
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

  loadSave()
  loadUpgrades()

  updateDisplay()
}

function updateDisplay() {
  const display = document.querySelector("#currency")
  display.innerText = currencyCounter
}

/*
  This function loads bought upgrades from upgrade_definitions.json and dynamically loads them into the shop sidebar
  and hooks them up with purchase logic
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
      <span class="level">Level: ${boughtUpgrades[element.id]}</span>
      <span class="fpc">FPC: ${element.fpc}</span>`

      shopButton.addEventListener('click', () => {
        if(currencyCounter >= cost) {
          currencyCounter -= cost
          updateDisplay()
          currencyPerClick += element.fpc
          boughtUpgrades[element.id] += 1
          console.log(element.id + " clicked")

          // localStorage behaves in a way i dont understand, saving and "reloading" is necessary after every change
          // may cause z-fighting style flickering
          saveGame()
          sidebar.innerHTML = ''
          loadUpgrades()
        }        
      })

      sidebar.appendChild(shopButton)
    })
  })
}

function saveGame() {
  localStorage.setItem("savedCurrentCurrency", currencyCounter)
  localStorage.setItem("savedCurrencyPerClick", currencyPerClick)
  localStorage.setItem("savedBoughtUpgrades", JSON.stringify(boughtUpgrades))
}

function loadSave() {
  let rawSavedCurrency = localStorage.getItem("savedCurrentCurrency")
  if(rawSavedCurrency !== null) {
    currencyCounter = Number(rawSavedCurrency)
  }

  let rawSavedCurrencyPerClick = localStorage.getItem("savedCurrencyPerClick")
  if(rawSavedCurrencyPerClick !== null) {
    currencyPerClick = Number(rawSavedCurrencyPerClick)
  }
  else{
    currencyPerClick = 1                                          // default click is always 1
  }

  const savedUpgrades = localStorage.getItem("savedBoughtUpgrades")
  const parsedUpgrades = JSON.parse(savedUpgrades)

  if(parsedUpgrades !== null) {
    for(let key in boughtUpgrades) {                // magic 😮
      if(parsedUpgrades.hasOwnProperty(key)) {
        boughtUpgrades[key] = parsedUpgrades[key]
      }
    }
  }
}

function resetProgress() {
  localStorage.clear()        // delet everything
}

window.onload = init()