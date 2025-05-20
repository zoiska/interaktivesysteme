let currencyCounter = 0;
let currencyPerClick = 1;

let isHovering = false; // is the mouse hovering over the bug
let optionsOpen = false;
let shopOpen = false;
let prestigeOpen = false;
let customisationOpen = false;
let statisticsOpen = false;

/* boughtUpgrades object initialization
  these are always 0 ! */
let boughtUpgrades = {
  ask_on_reddit: 0,
  google_it: 0,
  tell_chatgtp_to_do_it: 0,
  read_the_documentation: 0,
};

let statistics = {
  total_clicks: 0,
  total_currency: 0,
  total_upgrades_bought: 0,
  total_currency_spent: 0,
  // TODO: time spent ingame
};

function init() {
  const clicker = document.querySelector("#clickableArea");
  const sidebarOptions = document.querySelector(".sidebarOptions");
  const sidebarShop = document.querySelector(".sidebarShop");
  const optionsToggle = document.querySelector(".optionsToggle");
  const shopToggle = document.querySelector(".shopToggle");
  const resetButton = document.querySelector(".resetButton");
  const sidebarBackdrop = document.querySelector(".sidebarBackdrop");
  const prestigeButton = document.querySelector(".prestigeButton");
  const prestigeWindow = document.querySelector(".prestigeWindow");
  const customisationButton = document.querySelector(".customisationButton");
  const customisationWindow = document.querySelector(".customisationWindow");
  const statisticsButton = document.querySelector(".statisticsButton");
  const statisticsWindow = document.querySelector(".statisticsWindow");
  const statsContainer = document.querySelector(".statsContainer");

  clicker.addEventListener("click", () => {
    // the event listener for the ladybug click
    mainClickEvent();
  });

  clicker.addEventListener("mouseenter", () => {
    isHovering = true;
  });

  clicker.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  document.addEventListener("keydown", (event) => {
    if (
      (event.key === "Enter" && !event.repeat && isHovering === true) || // allow clicking with enter
      (event.key === " " && !event.repeat && isHovering === true)
    ) {
      // allow clicking with spacebar
      clicker.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.1)" }, { transform: "scale(1)" }],
        {
          duration: 60,
        }
      );
      mainClickEvent();
    }
  });

  resetButton.addEventListener("click", () => {
    // reset button
    resetProgress();
    location.reload();
  });

  optionsToggle.addEventListener("keydown", (event) => {
    // disable keyboard input for options button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaOptions.addEventListener("click", () => {
    // event listener for options button
    optionsOpen === false ? (optionsOpen = true) : (optionsOpen = false);
    sidebarOptions.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  prestigeButton.addEventListener("keydown", (event) => {
    // disable keyboard input for prestige button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaPrestige.addEventListener("click", () => {
    // event listener for prestige button
    prestigeOpen === false ? (prestigeOpen = true) : (prestigeOpen = false);
    prestigeWindow.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  customisationButton.addEventListener("keydown", (event) => {
    // disable keyboard input for customisation button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  customisationButton.addEventListener("click", () => {
    // event listener for customisation button
    customisationOpen === false ? (customisationOpen = true) : customisationOpen === false;
    customisationWindow.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  shopToggle.addEventListener("keydown", (event) => {
    // disable keyboard input for shop button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaShop.addEventListener("click", () => {
    // event listener for shop button
    shopOpen === false ? (shopOpen = true) : (shopOpen = false);
    sidebarShop.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  statisticsButton.addEventListener("click", () => {
    statisticsOpen === false ? (statisticsOpen = true) : (statisticsOpen = false);
    statisticsWindow.classList.toggle("open");
    sidebarOptions.classList.remove("open");
    toggleSidebarBackdrop(sidebarBackdrop);

    statsContainer.innerHTML = `
    <dl>
    <dt>Total clicks: </dt>
    <dd>${statistics.total_clicks}</dd>
    <dt>Total currency: </dt>
    <dd>${statistics.total_currency}</dd>
    <dt>Total currency spent: </dt>
    <dd>${statistics.total_currency_spent}</dd>
    <dt>Total amount of upgrades bought: </dt>
    <dd>${statistics.total_upgrades_bought}</dd>
    </dl>`;
  });

  sidebarBackdrop.addEventListener("click", () => {
    // if backdrop clicked, close everything
    shopOpen = false;
    optionsOpen = false;
    prestigeOpen = false;
    customisationOpen = false;
    statisticsOpen = false;
    sidebarOptions.classList.remove("open");
    optionsToggle.classList.remove("open");
    sidebarShop.classList.remove("open");
    shopToggle.classList.remove("open");
    sidebarBackdrop.classList.remove("open");
    customisationWindow.classList.remove("open");
    prestigeWindow.classList.remove("open");
    statisticsWindow.classList.remove("open");
  });

  loadSave();
  loadUpgrades();

  updateDisplay();
}

function mainClickEvent() {
  currencyCounter += currencyPerClick;
  statistics.total_clicks++;
  statistics.total_currency += currencyPerClick;
  updateDisplay();
  saveGame(); //save game, this will have to move at some point
}

function updateDisplay() {
  const display = document.querySelector("#currency");
  display.innerText = currencyCounter;
}

/* This function toggles a div over the ladybug, under the sidebars if one or both
  are open, else the backdrop is removed
  + all other windows opening
*/
function toggleSidebarBackdrop(sidebarBackdrop) {
  if (
    optionsOpen === true ||
    shopOpen === true ||
    prestigeOpen === true ||
    customisationOpen === true ||
    statisticsOpen === true
  ) {
    sidebarBackdrop.classList.add("open");
  } else {
    sidebarBackdrop.classList.remove("open");
  }
}

/* This function loads bought upgrades from upgrade_definitions.json and dynamically
  adds them as buttons into the shop sidebar and hooks them up with purchase logic */
function loadUpgrades() {
  const upgrades = upgrade_definitions;
  const sidebar = document.querySelector(".sidebarShop");

  upgrades.forEach((element) => {
    const shopButton = document.createElement("button");
    let cost =
      element.base_cost * Math.round((boughtUpgrades[element.id] + 1) ** element.price_multiplier);

    shopButton.className = "shopButton";
    shopButton.innerHTML = `
      <span class="name">${element.name}</span>
      <span class="desc">${element.description}</span>
      <span class="coin"><img src="./emojisvg/coin_1FA99.svg"></span>
      <span class="cost">${cost}</span>
      <span class="levelT">Level:</span>
      <span class="level">${boughtUpgrades[element.id]}</span>
      <span class="finger"><img src="./emojisvg/fingerpushing_E10C.svg"></span>
      <span class="fpc">${element.fpc}</span>`;

    shopButton.addEventListener("click", () => {
      if (currencyCounter >= cost) {
        currencyCounter -= cost;
        statistics.total_upgrades_bought++;
        statistics.total_currency_spent += cost;
        updateDisplay();
        currencyPerClick += element.fpc;
        boughtUpgrades[element.id] += 1;
        console.log(element.id + " clicked");

        // localStorage behaves in a way i dont understand, saving and "reloading" is necessary after every change
        // may cause z-fighting style flickering, too bad!
        saveGame();
        sidebar.innerHTML = "";
        loadUpgrades();
      }
    });

    sidebar.appendChild(shopButton);
  });
}

function saveGame() {
  localStorage.setItem("savedCurrentCurrency", currencyCounter);
  localStorage.setItem("savedCurrencyPerClick", currencyPerClick);
  localStorage.setItem("savedBoughtUpgrades", JSON.stringify(boughtUpgrades));
  localStorage.setItem("savedStatistics", JSON.stringify(statistics));
}

function loadSave() {
  let rawSavedCurrency = localStorage.getItem("savedCurrentCurrency");
  if (rawSavedCurrency !== null) {
    currencyCounter = Number(rawSavedCurrency);
  }

  let rawSavedCurrencyPerClick = localStorage.getItem("savedCurrencyPerClick");
  if (rawSavedCurrencyPerClick !== null) {
    currencyPerClick = Number(rawSavedCurrencyPerClick);
  } else {
    currencyPerClick = 1; // default click is always 1
  }

  //save bought upgrades
  const savedUpgrades = localStorage.getItem("savedBoughtUpgrades");
  const parsedUpgrades = JSON.parse(savedUpgrades);

  if (parsedUpgrades !== null) {
    for (let key in boughtUpgrades) {
      // magic 😮
      if (parsedUpgrades.hasOwnProperty(key)) {
        boughtUpgrades[key] = parsedUpgrades[key];
      }
    }
  }

  //save stats
  const savedStatistics = localStorage.getItem("savedStatistics");
  const parsedStatistics = JSON.parse(savedStatistics);

  if (parsedStatistics !== null) {
    for (let key in statistics) {
      if (parsedStatistics.hasOwnProperty(key)) {
        statistics[key] = parsedStatistics[key];
      }
    }
  }
}

function resetProgress() {
  localStorage.clear(); // delet everything
}

window.onload = init();
