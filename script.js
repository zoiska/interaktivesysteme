let mainCurrencyCounter = 0
let currencyPerClick = 1

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
  
    display.innerText = mainCurrencyCounter;
  }

window.onload = init()