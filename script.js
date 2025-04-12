let mainCurrencyCounter = 0
let currencyPerClick = 1

function init() {
    const clicker = document.querySelector("#clickableArea");
    const display = document.querySelector("#currencyDisplay");
  
    clicker.addEventListener("click", () => {
      mainCurrencyCounter += currencyPerClick;
      display.innerText = mainCurrencyCounter;
    });
  
    display.innerText = mainCurrencyCounter;
  }

window.onload = init()